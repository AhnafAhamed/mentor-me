import { useParams } from 'react-router-dom'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useEffect, useState } from 'react'
import {
  Box,
  createStyles,
  Avatar,
  Title,
  Stack,
  Flex,
  Text,
  Tabs,
  useMantineTheme,
  ScrollArea,
  Center
} from '@mantine/core'
import PrimaryButton from '../../components/global/PrimaryButton'
import { DatePicker } from '@mantine/dates'
import useUserStore from '../../store/userStore'
import useSupabase from '../../hooks/useSupabase'
import { getMentor, updateMentor } from '../../services/Mentor'
import CustomLoader from '../../components/global/CustomLoader'
import time from './../../data/time.json'
import TimeSlot from '../../components/global/TimeSlot'
import useSuapbaseWithCallback from '../../hooks/useSupabaseWithCallback'
import { addBooking } from '../../services/Booking'
import { notifications } from '@mantine/notifications'
import useReview from '../../hooks/useReview'
import ReviewCard from '../../components/global/ReviewCard'
import { MD5 } from 'crypto-js'

const useStyles = createStyles((theme) => ({
  header: {
    position: 'relative',
    width: '100%',
    height: '80px',
    borderRadius: '12px',
    background:
      'linear-gradient(120deg, #513DFF 0.32%, #A89EFF 32.05%, #C8C2FF 60.52%, #EFEEFF 96.20%)'
  },
  avatar: {
    position: 'absolute',
    left: '30px',
    bottom: '-40px'
  },
  workplace: {
    color: theme.colors.darkPurple,
    fontWeight: 500
  },
  introduction: {
    whiteSpace: 'pre-line'
  },
  timeSlotsDisabled: {
    opacity: 0.5,
    pointerEvents: 'none'
  },
  fee: {
    backgroundColor: theme.colors.lightPurple[0],
    color: theme.colors.darkBlack[0],
    borderRadius: '12px',
    padding: '8px',
    fontSize: '14px',
    fontWeight: 600,
    width: 'max-content'
  },
  feeIcon: {
    fontSize: '12px',
    marginRight: '4px',
    marginBottom: '2px'
  }
}))

const MentorProfile = () => {
  let { userId } = useParams()
  const { classes } = useStyles()
  const { user } = useUserStore()
  const theme = useMantineTheme()
  const { data: mentor } = useSupabase(getMentor.bind(this, userId))

  const [activeTab, setActiveTab] = useState('overview')
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [selectedSlotId, setSelectedSlotId] = useState(null)
  const [isMentorAvailable, setIsMentorAvailable] = useState(false)
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false)
  const [payhereHash, setPayhereHash] = useState('')
  const {
    callService: addBookingService,
    loading: loadingBookingData,
    data: bookingData
  } = useSuapbaseWithCallback(addBooking)
  const {
    callService: updateRevenueService,
    loading: loadingRevenueData,
    data: updatedMentorData,
    error
  } = useSuapbaseWithCallback(updateMentor)
  const { mentorReviews } = useReview(userId)

  const currentDate = new Date()
  const tomorrow = new Date(currentDate)
  tomorrow.setDate(currentDate.getDate() + 1)

  const handleSlotSelection = (time) => () => {
    setSelectedSlotId(time)
    const selectedDateTime = new Date(selectedDate)
    selectedDateTime.setHours(parseInt(time))

    setSelectedSlot(selectedDateTime)
  }

  const payment = {
    sandbox: true,
    merchant_id: '1223815', // Replace your Merchant ID
    return_url: 'http://localhost:5173/', // Important
    cancel_url: 'http://localhost:5173/', // Important
    notify_url: 'http://localhost:5173/',
    order_id: 'ItemNo12345',
    items: `Mentorship Session with`,
    amount: '2500',
    currency: 'LKR',
    hash: '', // *Replace with generated hash retrieved from backend
    first_name: 'Ahnaf',
    last_name: 'Ahamed',
    email: 'samanp@gmail.com',
    phone: '0771234567',
    address: 'No.1, Galle Road',
    city: 'Colombo',
    country: 'Sri Lanka',
    delivery_address: 'No. 46, Galle road, Kalutara South',
    delivery_city: 'Kalutara',
    delivery_country: 'Sri Lanka',
    custom_1: '',
    custom_2: ''
  }

  const confirmPaidBooking = async () => {
    console.log(mentor[0])
    await addBookingService({
      meeting_time: selectedSlot,
      booked_mentor: mentor[0].user_uid,
      booked_mentor_id: mentor[0].id,
      booked_by: user.user_uid,
      booked_by_id: user.id,
      meeting_status: 'pending',
      payment_status: 'paid'
    })

    await updateRevenueService(mentor[0].user_uid, {
      revenue: mentor[0].revenue + parseInt(mentor[0].fee)
    })
  }

  useEffect(() => {
    if (isBookingConfirmed) {
      confirmPaidBooking()
      setIsBookingConfirmed(false)
    }
  }, [isBookingConfirmed])

  useEffect(() => {
    if (bookingData) {
      notifications.show({
        title: 'Booking Sent for Approval',
        color: 'green'
      })
    }
  }, [bookingData])

  useEffect(() => {
    // Calculate the MD5 hash
    let hashedSecret = MD5(
      'MjI1MTIxOTkwMjM1MjQ4MDk1NjQxMjIzNTcyNDE0MDYyOTM4MzU3'
    )
      .toString()
      .toUpperCase()
    let amountFormated = parseFloat(payment.amount)
      .toLocaleString('en-us', { minimumFractionDigits: 2 })
      .replaceAll(',', '')
    let currency = 'LKR'
    let hash = MD5(
      payment.merchant_id +
        payment.order_id +
        amountFormated +
        currency +
        hashedSecret
    )
      .toString()
      .toUpperCase()
    setPayhereHash(hash)

    payhere.onCompleted = function onCompleted(orderId) {
      console.log('Payment completed. OrderID:' + orderId)

      setIsBookingConfirmed(true)

      // Note: validate the payment and show success or failure page to the customer
    }
    payhere.onDismissed = function onDismissed() {
      // Note: Prompt user to pay again or show an error page
      console.log('Payment dismissed')
    }

    // Error occurred
    payhere.onError = function onError(error) {
      // Note: show an error page
      console.log('Error:' + error)
    }
  }, [])

  useEffect(() => {
    if (!mentor) return
    if (
      !mentor[0].availability.weekDayAvailable &&
      !mentor[0].availability.weekEndAvailable
    ) {
      setIsMentorAvailable(false)
    } else {
      setIsMentorAvailable(true)
    }
  }, [mentor])

  const confirmBooking = async () => {
    //visa - 4916217501611292
    payment.hash = payhereHash

    payhere.startPayment(payment)

    return
  }

  const excludedDates = (date) => {
    if (mentor[0] && !mentor[0].availability.weekDayAvailable) {
      return date.getDay() >= 1 && date.getDay() <= 5
    } else if (mentor[0] && !mentor[0].availability.weekEndAvailable) {
      return date.getDay() === 0 || date.getDay() === 6
    }
  }

  if (!mentor)
    return (
      <DashboardLayout>
        <CustomLoader />
      </DashboardLayout>
    )

  return (
    <DashboardLayout>
      <Box className={classes.header}>
        <Avatar
          className={classes.avatar}
          src={mentor[0]?.image}
          radius={80}
          size={80}
        />
      </Box>
      <Stack mt={80} spacing={8} mb={32}>
        <Title>{mentor[0]?.first_name + ' ' + mentor[0]?.last_name}</Title>
        <Flex>
          <Text size="md">
            {mentor[0]?.job_title} at{' '}
            <span className={classes.workplace}> {mentor[0]?.workplace}</span>
          </Text>
        </Flex>
        <Flex className={classes.fee} align="center">
          <span className={classes.feeIcon}>💵</span> LKR {mentor[0]?.fee}/=
          Session
        </Flex>
      </Stack>
      <Tabs
        defaultValue="overview"
        value={activeTab}
        onTabChange={setActiveTab}
      >
        <Tabs.List position="center" mb={48}>
          <Tabs.Tab value="overview">Overview</Tabs.Tab>
          <Tabs.Tab value="slots">Available Slots</Tabs.Tab>
          <Tabs.Tab value="review">Reviews</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="overview">
          <Text className={classes.introduction} size="md" mb={32}>
            {mentor[0]?.introduction}
          </Text>
          <PrimaryButton
            text="Book Now"
            maw={320}
            m="auto"
            onClick={() => setActiveTab('slots')}
          />
        </Tabs.Panel>

        <Tabs.Panel value="slots">
          {isMentorAvailable ? (
            <>
              <Text color={theme.colors.darkGray[0]} align="center" mb={32}>
                Book 1:1 Sessions based on availability
              </Text>

              <Flex justify="center" gap={48} wrap="wrap">
                <DatePicker
                  hideOutsideDates
                  maxLevel="month"
                  size="md"
                  minDate={tomorrow}
                  excludeDate={excludedDates}
                  value={selectedDate}
                  onChange={setSelectedDate}
                />

                {selectedDate && (
                  <ScrollArea
                    className={!selectedDate ? classes.timeSlotsDisabled : null}
                    h={350}
                    scrollbarSize={6}
                    p={24}
                  >
                    <Stack>
                      {mentor[0].availability.weekEndAvailable &&
                        (selectedDate.getDay() === 0 ||
                          selectedDate.getDay() === 6) &&
                        time
                          .slice(
                            mentor[0]?.availability.weekEndStart,
                            mentor[0]?.availability.weekEndEnd
                          )
                          .map((item) => (
                            <TimeSlot
                              key={item.value}
                              time={item.label}
                              selected={item.value === selectedSlotId}
                              slotClick={handleSlotSelection(item.value)}
                            />
                          ))}
                      {mentor[0].availability.weekDayAvailable &&
                        selectedDate.getDay() >= 1 &&
                        selectedDate.getDay() <= 5 &&
                        time
                          .slice(
                            mentor[0]?.availability.weekDayStart,
                            mentor[0]?.availability.weekDayEnd
                          )
                          .map((item) => (
                            <TimeSlot
                              key={item.value}
                              time={item.label}
                              selected={item.value === selectedSlotId}
                              slotClick={handleSlotSelection(item.value)}
                            />
                          ))}
                    </Stack>
                  </ScrollArea>
                )}
              </Flex>
              <PrimaryButton
                text="Book"
                maw={300}
                mt={32}
                mx="auto"
                disabled={!selectedSlot}
                loading={loadingBookingData}
                onClick={confirmBooking}
              />
            </>
          ) : (
            <Text align="center">Mentor is currently unavailable</Text>
          )}
        </Tabs.Panel>

        <Tabs.Panel value="review">
          <Center spacing={32} mt={48}>
            <Stack maw={420}>
              {mentorReviews ? (
                mentorReviews.map((review) => (
                  <ReviewCard
                    key={review.id}
                    firstName={review.Mentee.first_name}
                    lastName={review.Mentee.last_name}
                    title={review.Mentee.college}
                    time={review.meeting_start}
                    rating={review.rating}
                    review={review.review}
                  />
                ))
              ) : (
                <CustomLoader />
              )}
              {mentorReviews?.length === 0 && <Text>No reviews yet</Text>}
            </Stack>
          </Center>
        </Tabs.Panel>
      </Tabs>
    </DashboardLayout>
  )
}

export default MentorProfile
