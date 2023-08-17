import TitleActions from "@/components/ItemActions";
import AddItemButton from "@/components/Modal/AddItemButton";
import UIContext from "@/context/UIContext";
import { PrismaClient } from "@prisma/client";

async function getItems() {
  try {
    const prisma = new PrismaClient();
    await prisma.$connect();
    const titles = await prisma.titles.findMany({
      where: {
        isDeleted: false,
      },
    });
    await prisma.$disconnect();
    return titles;
  } catch (error) {
    return [];
  }
}

export default async function Home() {
  const items = await getItems();

  return (
    <UIContext>
      <main className="container min-h-screen pt-20 p-2 mx-auto space-y-4 overflow-hidden">
        <section className=" rounded-lg overflow-hidden">
          <table className="w-full text-sm table-auto text-left text-gray-500 dark:text-gray-400 overflow-x-auto ">
            <caption className="p-5 text-lg font-semibold text-left   text-white bg-gray-800">
              <div className="flex justify-between mb-2 align-center">
                <h2 className="text-xl font-bold">Items Table</h2>
                <AddItemButton />
              </div>
            </caption>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-3">
                  Title
                </th>
                <th scope="col" className="p-3">
                  Status
                </th>
                <th scope="col" className="p-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="p-3 break-all font-medium text-gray-900  dark:text-white"
                  >
                    {item.title}
                  </th>
                  <td className="p-3 whitespace-nowrap">
                    {item.isActive ? (
                      <>
                        <div className="inline-block h-2.5 w-2.5 rounded-full bg-green-500  shadow-green-400 shadow-sm"></div>
                        <span>&nbsp;Active</span>
                      </>
                    ) : (
                      <>
                        <div className="inline-block h-2.5 w-2.5 rounded-full bg-red-500  shadow-red-400 shadow-sm"></div>
                        <span>&nbsp;InActive</span>
                      </>
                    )}
                  </td>
                  <td className="p-3 gap-3 flex">
                    <TitleActions {...item} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </UIContext>
  );
}
