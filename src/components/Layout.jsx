import { Grid, createStyles } from '@mantine/core'
import TopBar from './dashboard/TopBar'
import SideBar from './dashboard/SideBar'
import Main from './dashboard/Main'

const useStyles = createStyles(() => ({
  container: {
    backgroundColor: '#EDF2F7'
  }
}))

const Layout = ({ children }) => {
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
          <Main>{children}</Main>
        </div>
      </Grid.Col>
    </Grid>
  )
}

export default Layout
