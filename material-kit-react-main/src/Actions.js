import { useEffect, useState } from 'react';

const Actions = () => {
  let [users, setUsers] = useState([]); //eslint-disable-line

  // userLength is for showing the Data Loading message.
  const [userLength, setUserLength] = useState(null);

  useEffect(() => {
    fetch('http://localhost/php-react/all-users.php')
      .then((res) => (res.json()))
      .then((data) => {
        if (data.success) {
          setUsers(data.users);
          setUserLength(true);
        } else {
          setUserLength(0);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Inserting a new user into the database.
  const insertUser = (newUser) => {
    fetch('http://localhost/php-react/add-user.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => (res.json()))
      .then((data) => {
        if (data.id) {
          setUsers([
            {
              id: data.id,
              ...newUser,
            },
            ...users,
          ]);
          setUserLength(true);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Enabling the edit mode for a listed user.
  const editMode = (id) => {
    users = users.map((user) => {
      if (user.id === id) {
        user.isEditing = true; // eslint-disable-line no-param-reassign
        return user;
      }
      user.isEditing = false; // eslint-disable-line no-param-reassign
      return user;
    });
    setUsers(users);
  };

  // Cance the edit mode.
  const cancelEdit = (id) => {
    users = users.map((user) => {
      if (user.id === id) {
        user.isEditing = false; // eslint-disable-line no-param-reassign
        return user;
      }
      return user;
    });
    setUsers(users);
  };

  // Updating a user.
  const updateUser = (userData) => {
    fetch('http://localhost/php-react/update-user.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((res) => (res.json()))
      .then((data) => {
        if (data.success) {
          users = users.map((user) => {
            if (user.id === userData.id) {
              user.isEditing = false; // eslint-disable-line no-param-reassign
              user.user_name = userData.user_name; // eslint-disable-line no-param-reassign
              user.user_job = userData.user_job; // eslint-disable-line no-param-reassign
              return user;
            }
            return user;
          });
          setUsers(users);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Deleting a user.
  const deleteUser = (theID) => {
    // filter outing the user.
    let userDeleted = users.filter((user) => { // eslint-disable-line
      return user.id !== theID;
    });
    fetch('http://localhost/php-react/delete-user.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: theID }),
    })
      .then((res) => (res.json()))
      .then((data) => {
        if (data.success) {
          setUsers(userDeleted);
          if (users.length === 1) {
            setUserLength(0);
          }
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    users,
    editMode,
    cancelEdit,
    updateUser,
    insertUser,
    deleteUser,
    userLength,
  };
};

export default Actions;
