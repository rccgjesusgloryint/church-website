"use client";

import React from "react";
import { BiEdit } from "react-icons/bi";
import MediaPage from "../../../../components/media";
import CreateEvent from "../../../../components/events";
import CreateSermonForm from "../../../../components/sermons/create-sermon-form";
import Navbar2 from "../../../../components/navbar/Navbar2";

import BlogCreator from "../../../../components/blogs/BlogCreator";
import { getAllUsers, getAuthUserDetails } from "@/lib/queries";
import { Role, User } from "@prisma/client";
import { useModal } from "@/providers/modal-provider";
import CustomModal from "../../../../components/global/custom-modal";
import UpdateUserForm from "../../../../components/admin/UpdateUserForm";

const AdminPage = () => {
  const [user, setUser] = React.useState<string>();
  const [allUsers, setAllUsers] = React.useState<User[]>();
  const [refresh, setRefresh] = React.useState(false);
  const { setOpen } = useModal();

  React.useEffect(() => {
    // Fetch authenticated user details
    const getInfo = async () => {
      const response = (await getAuthUserDetails()) as User;
      setUser(response.id);
    };

    // Fetch all users
    const getData = async () => {
      const users = await getAllUsers();
      setAllUsers(users);
    };

    getData();
    getInfo();
  }, [refresh]); // 🔄 Re-run effect when `refresh` changes

  const handleEditClick = (id: string) => {
    if (!allUsers) return false;
    const user = allUsers.find((user) => user.id === id);
    if (!user) return alert("NO user found");
    setOpen(
      <CustomModal>
        <UpdateUserForm
          usersRole={user.member as Role}
          userId={user.id}
          setRefresh={setRefresh}
        />
      </CustomModal>
    );
  };

  return (
    <>
      <Navbar2 />
      <section className="w-full h-full px-10">
        <h1 className="flex items-center justify-center text-xl mt-8">
          Admin Page
        </h1>
        <MediaPage />
        <CreateEvent />
        <section className="h-auto border p-5">
          <h1>Create Sermon Form</h1>
          <CreateSermonForm />
        </section>
        <section>
          <BlogCreator userId={user} />
        </section>
        <section>
          <h1 className="text-2xl">Edit Users</h1>
          <div className="flex flex-col">
            {allUsers?.map(({ name, member, id }) => (
              <div className="flex items-center justify-center gap-2" key={id}>
                <span>
                  {name}-{member}
                </span>
                <BiEdit
                  className="cursor-pointer"
                  onClick={() => handleEditClick(id)}
                />
              </div>
            ))}
          </div>
        </section>
      </section>
    </>
  );
};

export default AdminPage;
