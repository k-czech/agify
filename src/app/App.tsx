import { getAgeOfMultipleNames } from 'api';
import { AgeOfMultipleNamesResponseType } from 'api/types/types';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { NameList } from 'components/NameList';
import { ChangeEvent, useCallback, useRef, useState } from 'react';

const App = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [name, setName] = useState('');
  const [nameListData, setNameListData] = useState<
    AgeOfMultipleNamesResponseType | AgeOfMultipleNamesResponseType[]
  >([]);
  const [loading, setLoading] = useState(false);

  const handleChangeName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
    },
    []
  );

  const handleApiCall = useCallback(async (name: string | string[]) => {
    setLoading(true);
    await getAgeOfMultipleNames(name)
      .then(data => {
        setNameListData(data);
        setLoading(false);
      })
      .catch(err => {
        if (err.message === 'Dzienny limit zapytań API został przekroczony.') {
          alert(err.message);
        } else {
          console.error('Error:', err);
        }
      });
  }, []);

  const handleSubmit = useCallback(
    async (e: { preventDefault: () => void }) => {
      e.preventDefault();
      setLoading(true);
      if (name.includes(',') || name.includes(' ')) {
        const newNames = name.split(' ');
        await handleApiCall(newNames);
      } else {
        await handleApiCall(name);
      }

      formRef.current?.reset();
      setName('');
    },
    [name]
  );

  return (
    <div className="flex flex-col h-screen items-center justify-center space-y-6">
      <form ref={formRef} onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="mb-5">
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeName(e)}
            placeholder="Podaj imię lub listę imion"
          />
        </div>

        <Button type="submit">{loading ? 'Wyszukiwanie...' : 'Szukaj'}</Button>
      </form>
      {nameListData && <NameList nameListData={nameListData} />}
    </div>
  );
};

export default App;
