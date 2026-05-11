const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Mulai membersihkan data lama...');
  await prisma.attendance.deleteMany({});
  await prisma.employee.deleteMany({});
  await prisma.department.deleteMany({});

  console.log('Membuat departemen...');
  const it = await prisma.department.create({ data: { name: 'IT Engineering' } });
  const hr = await prisma.department.create({ data: { name: 'Human Resources' } });
  const sales = await prisma.department.create({ data: { name: 'Sales & Marketing' } });

  console.log('Membuat pegawai...');
  const employees = [
    { name: 'Andi Wijaya', position: 'Software Architect', departmentId: it.id, salary: 15000000 },
    { name: 'Siti Aminah', position: 'HR Manager', departmentId: hr.id, salary: 12000000 },
    { name: 'Budi Santoso', position: 'Senior Developer', departmentId: it.id, salary: 10000000 },
    { name: 'Lestari Putri', position: 'Sales Exec', departmentId: sales.id, salary: 7000000 },
    { name: 'Heri CEO', position: 'CEO', departmentId: hr.id, salary: 25000000 },
    { name: 'Dewi Sartika', position: 'UI/UX Designer', departmentId: it.id, salary: 9000000 },
  ];

  const createdEmployees = [];
  for (const emp of employees) {
    const created = await prisma.employee.create({
      data: {
        ...emp,
        hireDate: new Date('2024-01-10'),
      }
    });
    createdEmployees.push(created);
  }

  console.log('Membuat absensi hari ini secara acak...');
  const today = new Date();
  
  // Andi, Budi, dan Heri sudah absen. Siti, Lestari, dan Dewi belum.
  const whoClockedIn = [0, 2, 4]; 

  for (const index of whoClockedIn) {
    await prisma.attendance.create({
      data: {
        employeeId: createdEmployees[index].id,
        status: 'PRESENT',
        date: today
      }
    });
  }

  console.log('Seeding selesai! 🚀');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
