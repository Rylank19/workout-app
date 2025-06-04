import PlanCard from '@/components/plans/PlanCard'
import { Container, VStack } from '@chakra-ui/react'

const WeeklyPlansPage = () => {
  const cardNames = ["Heria Workout", "Custom Workout", "Competition Workout", "Bulking Workout"]

  return (
    <Container>
      <VStack direction={"column"} gap={4}>
        {cardNames.map(name => {
          return <PlanCard cardName={name} />
        })}
      </VStack>
    </Container>
  )
}

export default WeeklyPlansPage