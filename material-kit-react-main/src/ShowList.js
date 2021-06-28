import { Provider } from 'src/Context';
import UserList from 'src/components/UserList';
import Actions from 'src/Actions';

const ShowList = () => {
  const data = Actions();
  return (
    <Provider value={data}>
      <div className="showList">
        <UserList />
      </div>
    </Provider>
  );
};

export default ShowList;
