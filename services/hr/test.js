const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
  try {
    const departmentName = "marketing";
    let department = await prisma.department.findUnique({
      where: { name: departmentName }
    });

    if (!department) {
      department = await prisma.department.create({
        data: { name: departmentName }
      });
    }

    const employee = await prisma.employee.create({
      data: {
        name: "heri",
        position: "ceo",
        salary: 8000000,
        hireDate: new Date(),
        departmentId: department.id
      }
    });
    console.log("Success:", employee);
  } catch (e) {
    console.error("Error:", e);
  } finally {
    await prisma.$disconnect();
  }
}
test();
