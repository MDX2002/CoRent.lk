import React, { useState } from "react";

function Home() {
  const [places, setPlaces] = useState([
    { id: 1, name: "Tharaka Perera", type: "Shared Room", location: "Colombo", price: "10 000" },
    { id: 2, name: "Kamal Perera", type: "Private Room", location: "Galle", price: "15 000" },
    { id: 3, name: "Sunil Silva", type: "Shared Room", location: "Kandy", price: "12 000" },
  ]);

  const [users, setUsers] = useState([
    { id: 1, name: "Amal Perera", Email: "amalperera@gmail.com", UserName: "Amal15", Type: "Owner" },
    { id: 2, name: "Nimal Silva", Email: "nimal.silva@gmail.com", UserName: "Nimal22", Type: "User" },
    { id: 3, name: "Saman Kumara", Email: "saman.kumara@gmail.com", UserName: "Saman33", Type: "User" },
  ]);

  const [searchPlace, setSearchPlace] = useState("");
  const [filterPlaceType, setFilterPlaceType] = useState("");

  const [searchUser, setSearchUser] = useState("");
  const [filterUserType, setFilterUserType] = useState("");

  const handleDeletePlace = (id) => {
    setPlaces(places.filter((place) => place.id !== id));
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  // Filter places based on search text and room type filter
  const filteredPlaces = places.filter((place) => {
    const searchLower = searchPlace.toLowerCase();
    const matchesSearch =
      place.name.toLowerCase().includes(searchLower) ||
      place.type.toLowerCase().includes(searchLower) ||
      place.location.toLowerCase().includes(searchLower) ||
      place.price.toLowerCase().includes(searchLower);

    const matchesType = filterPlaceType === "" || place.type === filterPlaceType;

    return matchesSearch && matchesType;
  });

  // Filter users based on search text and user type filter
  const filteredUsers = users.filter((user) => {
    const searchLower = searchUser.toLowerCase();
    const matchesSearch =
      user.name.toLowerCase().includes(searchLower) ||
      user.Type.toLowerCase().includes(searchLower) ||
      (user.Email && user.Email.toLowerCase().includes(searchLower)) ||
      (user.UserName && user.UserName.toLowerCase().includes(searchLower));

    const matchesType = filterUserType === "" || user.Type === filterUserType;

    return matchesSearch && matchesType;
  });

  // Table renderer reusable for both places and users
  const renderTable = (data, deleteHandler, isUserTable = false) => (
    <table className="overflow-hidden rounded-lg border border-gray-300">
      <thead>
        <tr className="bg-[#8B77FF] text-black">
          <th className="px-10 py-2 border-b border-gray-300 text-left">Name</th>
          <th className="px-10 py-2 border-b border-gray-300 text-left">Type</th>
          {isUserTable ? (
            <>
              <th className="px-10 py-2 border-b border-gray-300 text-left">Email</th>
              <th className="px-10 py-2 border-b border-gray-300 text-left">UserName</th>
            </>
          ) : (
            <>
              <th className="px-4 py-2 border-b border-gray-300 text-left">Location</th>
              <th className="px-4 py-2 border-b border-gray-300 text-left">Price</th>
            </>
          )}
          <th className="px-4 py-2 border-b border-gray-300 text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((item, index) => (
            <tr
              key={item.id}
              className={index % 2 === 0 ? "bg-white" : "bg-[#8B77FF]/[0.15]"}
            >
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">{item.type || item.Type}</td>
              {isUserTable ? (
                <>
                  <td className="px-4 py-2">{item.Email}</td>
                  <td className="px-4 py-2">{item.UserName}</td>
                </>
              ) : (
                <>
                  <td className="px-4 py-2">{item.location}</td>
                  <td className="px-4 py-2">{item.price}</td>
                </>
              )}
              <td className="px-4 py-2 text-center">
                <button
                  onClick={() => deleteHandler(item.id)}
                  className="hover:scale-125 transition-all duration-300"
                >
                  <img
                    src="icons8-delete-50.png"
                    alt="Delete"
                    className="w-8 h-8"
                  />
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={isUserTable ? 6 : 5} className="text-center p-4">
              No matching records found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );

  return (
    <div className="bg-[#72759E]/[0.25] w-full h-full absolute top-0 left-0">
      <div style={{ backgroundColor: "rgb(131,134,173)" }}>
        <h1 className="text-4xl font-bold py-4 text-left pl-5">Admin Dashboard</h1>
      </div>

      <div className="flex justify-center space-x-10">
        {/* Place Table */}
        <section className="flex space-x-4">
          <div className="p-2">
            <h2 className="text-2xl font-bold mb-4">Place Table</h2>

            <input
              type="text"
              className="border border-gray-300 p-2 rounded-full mb-4"
              placeholder="Search places..."
              value={searchPlace}
              onChange={(e) => setSearchPlace(e.target.value)}
            />

            <select
              className="mb-4 ml-20 p-2 border border-gray-300 rounded-full"
              value={filterPlaceType}
              onChange={(e) => setFilterPlaceType(e.target.value)}
            >
              <option value="">All Room Types</option>
              <option value="Shared Room">Shared Room</option>
              <option value="Private Room">Private Room</option>
            </select>

            {renderTable(filteredPlaces, handleDeletePlace, false)}
          </div>
        </section>

        {/* Users Table */}
        <section className="flex space-x-4">
          <div className="p-2">
            <h2 className="text-2xl font-bold mb-4">Users Table</h2>

            <input
              type="text"
              className="border border-gray-300 p-2 rounded-full mb-4"
              placeholder="Search users..."
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
            />

            <select
              className="mb-4 ml-20 p-2 border border-gray-300 rounded-full"
              value={filterUserType}
              onChange={(e) => setFilterUserType(e.target.value)}
            >
              <option value="">All User Types</option>
              <option value="Owner">Owner</option>
              <option value="User">User</option>
            </select>

            {renderTable(filteredUsers, handleDeleteUser, true)}
          </div>
        </section>
        
      </div>
      <section>
        <div className="flex justify-center item-center px-30 border-full">
            ________________________________________________________________________________
        <h2 className=" text-3xl font-bold mb-4 p-5">Customer Reviews</h2>
            ________________________________________________________________________________
        </div>
            <div className="flex justify-center items-center">
                
                <div className="max-w-md mx-auto bg-white rounded-xl shadow-xl p-1 border-4 border border-gray-400">
                    <div className="flex items-center space-x-4">
                        {/* Profile Image */}
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300">
                        <img
                            src="icons8-user-100.png"
                            alt="Profile"
                            className="w-full h-full  object-cover"
                        />
                        </div>

                        {/* Name and Stars */}
                        <div>
                        <h2 className="font-semibold text-lg">Tharaka Perera</h2>
                        <div className="flex space-x-1 mt-1 text-yellow-400">
                            {Array(5)
              .fill(0)
              .map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.462a1 1 0 00-.364 1.118l1.287 3.966c.3.92-.755 1.688-1.54 1.118l-3.388-2.462a1 1 0 00-1.175 0l-3.388 2.462c-.784.57-1.838-.197-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.045 9.393c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.966z" />
                </svg>
              ))}
                        </div>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="mt-4 text-gray-700 text-sm leading-relaxed">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
                    </p>
                </div>
                <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-1 border-4 border border-gray-400">
                    <div className="flex items-center space-x-4">
                        {/* Profile Image */}
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300">
                        <img
                            src="icons8-user-100.png"
                            alt="Profile"
                            className="w-full h-full  object-cover"
                        />
                        </div>

                        {/* Name and Stars */}
                        <div>
                        <h2 className="font-semibold text-lg">Tharaka Perera</h2>
                        <div className="flex space-x-1 mt-1 text-yellow-400">
                            {Array(5)
              .fill(0)
              .map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.462a1 1 0 00-.364 1.118l1.287 3.966c.3.92-.755 1.688-1.54 1.118l-3.388-2.462a1 1 0 00-1.175 0l-3.388 2.462c-.784.57-1.838-.197-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.045 9.393c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.966z" />
                </svg>
              ))}
                        </div>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="mt-4 text-gray-700 text-sm leading-relaxed">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
                    </p>
                    </div>
                <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-1 border-4 border border-gray-400">
                    <div className="flex items-center space-x-4">
                        {/* Profile Image */}
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300">
                        <img
                            src="icons8-user-100.png"
                            alt="Profile"
                            className="w-full h-full  object-cover"
                        />
                        </div>

                        {/* Name and Stars */}
                        <div>
                        <h2 className="font-semibold text-lg">Tharaka Perera</h2>
                        <div className="flex space-x-1 mt-1 text-yellow-400">
                            {Array(5)
              .fill(0)
              .map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.462a1 1 0 00-.364 1.118l1.287 3.966c.3.92-.755 1.688-1.54 1.118l-3.388-2.462a1 1 0 00-1.175 0l-3.388 2.462c-.784.57-1.838-.197-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.045 9.393c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.966z" />
                </svg>
              ))}
                        </div>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="mt-4 text-gray-700 text-sm leading-relaxed">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
                    </p>
                    </div>
            </div>
            <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-full">
                    Show All Reviews
                </button>
        </section>
    </div>
  );
}

export default Home;
