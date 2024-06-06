import { AgeOfMultipleNamesResponseType } from 'api/types/types';

export const NameList = ({
  nameListData,
}: {
  nameListData:
    | AgeOfMultipleNamesResponseType
    | AgeOfMultipleNamesResponseType[];
}) => {
  if (
    !nameListData ||
    (nameListData as AgeOfMultipleNamesResponseType[]).length === 0
  ) {
    return <p>Brak danych</p>;
  }

  return (
    <table className="w-full max-w-sm text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Imię
          </th>
          <th scope="col" className="px-6 py-3">
            Wiek
          </th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(nameListData) ? (
          nameListData.map((data, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td className="px-6 py-4">{data.name}</td>
              <td className="px-6 py-4">{data.age}</td>
            </tr>
          ))
        ) : (
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="px-6 py-4">{nameListData.name}</td>
            <td className="px-6 py-4">{nameListData.age}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
