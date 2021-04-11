import { Box, Flex, SimpleGrid, Text, theme } from "@chakra-ui/react"
import dynamic from 'next/dynamic'
import { Header } from "../components/Header"
import { Sidebar } from "../components/Sidebar"

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false
})

const barOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  plotOptions: {
    bar: {
      horizontal: true,
      distributed: true,
      dataLabels: {
        position: 'top',
      },
    }
  },
  // colors: [theme.colors.pink[500], theme.colors.blue[500], theme.colors.cyan[200]],
  colors: [function ({ value, seriesIndex, w }) {
    if (value === 10) {
      return theme.colors.pink[500]
    } else if (value < 10 && value > 6) {
      return theme.colors.blue[500]
    } else {
      return theme.colors.cyan[200]
    }
  }],
  dataLabels: {
    enabled: true,
    textAnchor: "start",
    offsetX: 8,
    style: {
      fontSize: '10px',
      colors: [theme.colors.gray[600]]
    },
    formatter: function (value, { seriesIndex, dataPointIndex, w }) {
      const values = ["Diamante", "Ouro", "Prata"];
      return value + ` (${values[dataPointIndex]})`
    }
  },
  stroke: {
    show: true,
    width: 2,
    colors: [theme.colors.gray[800]]
  },
  tooltip: {
    enabled: false
  },
  xaxis: {
    axisBorder: {
      color: theme.colors.gray[600]
    },
    axisTicks: {
      color: theme.colors.gray[600]
    },
    categories: ["primeiro", "segundo", "terceiro"],
  },
  yaxis: {
    show: false
  }
}

const options = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      color: theme.colors.gray[600]
    },
    axisTicks: {
      color: theme.colors.gray[600]
    },
    categories: [
      '2021-03-18T00:00:00.000Z',
      '2021-03-19T00:00:00.000Z',
      '2021-03-20T00:00:00.000Z',
      '2021-03-21T00:00:00.000Z',
      '2021-03-22T00:00:00.000Z',
      '2021-03-23T00:00:00.000Z',
      '2021-03-24T00:00:00.000Z',
    ],
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3,
    }
  }
}

const series = [
  { name: 'series1', data: [32, 24, 103, 67, 53, 132, 47] }
]

const series2 = [
  { name: 'series2', data: [96, 24, 44, 37, 103, 132, 51] }
]

const barSeries = [
  { name: 'barSeries', data: [10, 7, 6] },
  // { name: 'barSeries2', data: [7, 9, 8] }
]

export default function Dashboard() {
  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">
          <Box
            p={["6", "8"]}
            bg="gray.800"
            borderRadius={8}
            pb="4"
          >
            <Text fontSize="lg" mb="4">Inscritos da semana</Text>
            <Chart options={options} series={series} type="area" height={160} />
          </Box>

          <Box
            p={["6", "8"]}
            bg="gray.800"
            borderRadius={8}
          >
            <Text fontSize="lg" mb="4">Taxa de abertura</Text>
            <Chart options={options} series={series2} type="area" height={160} />
          </Box>

          <Box
            p={["6", "8"]}
            bg="gray.800"
            borderRadius={8}
          >
            <Text fontSize="lg" mb="4">Posições</Text>
            <Chart options={barOptions} series={barSeries} type="bar" height={160} />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}