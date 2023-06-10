import { Flex, Text, useMantineTheme } from '@mantine/core'
import { useEffect } from 'react'

const Logo = ({ iconSize, textSize, textColor, textWeight }) => {
  const theme = useMantineTheme()
  useEffect(() => {
    console.log({ theme })
  }, [])
  return (
    <Flex align="center" gap={14}>
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22 10V16H18C16.8 16 16 16.8 16 18V22H10V18C10 13.6 13.6 10 18 10H22Z"
          stroke="#513DFF"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M26 38V32H30C31.2 32 32 31.2 32 30V26H38V30C38 34.4 34.4 38 30 38H26Z"
          stroke="#513DFF"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M30 44H18C8 44 4 40 4 30V18C4 8 8 4 18 4H30C40 4 44 8 44 18V30C44 40 40 44 30 44Z"
          stroke="#513DFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <Text size={textSize} weight={textWeight} color={textColor}>
        Mentor Me
      </Text>
    </Flex>
  )
}

export default Logo
