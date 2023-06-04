import { Grid, createStyles } from '@mantine/core'
import useUserStore from '../../store/userStore'
import TopBar from '../../components/dashboard/TopBar'
import SideBar from '../../components/dashboard/SideBar'
import Main from '../../components/dashboard/Main'

const useStyles = createStyles(() => ({
  container: {
    backgroundColor: '#EDF2F7'
  }
}))

const Dashboard = () => {
  const { user } = useUserStore()
  const { classes } = useStyles()
  return (
    <Grid gutter="xl" grow>
      <Grid.Col span={12}>
        <div className={classes.container}>
          <TopBar />
        </div>
      </Grid.Col>
      <Grid.Col span={2}>
        <div className={classes.container}>
          <SideBar />
        </div>
      </Grid.Col>
      <Grid.Col span={8}>
        <div className={classes.container}>
          <Main />
        </div>
      </Grid.Col>
    </Grid>
  )
}

export default Dashboard
