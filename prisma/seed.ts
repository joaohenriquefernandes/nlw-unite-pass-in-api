import { prisma } from '../src/libs/prisma'

async function seed() {
  await prisma.event.create({
    data: {
      id: '246ff5a1-35da-418e-8da8-1301da554004',
      title: 'Unite Summit',
      slug: 'unite-summit',
      details: 'Um evento para devs',
      maximumAttendees: 120
    }

  })
}

seed().then(() => {
  console.log('Database seeded!')
  prisma.$disconnect()
})
