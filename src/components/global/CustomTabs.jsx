import { Tabs } from '@mantine/core'

const Tabs = () => {
  return (
    <Tabs defaultValue="first">
      <Tabs.List position="center">
        <Tabs.Tab value="first">First tab</Tabs.Tab>
        <Tabs.Tab value="second">Second tab</Tabs.Tab>
        <Tabs.Tab value="third">Third tab</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  )
}

export default Tabs
