 // Replace with your backend API URL

export const getUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/user');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };
  

export const createUser = async (userData) => {
  const response = await fetch('http://localhost:5000/api/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  return data;
 
};
