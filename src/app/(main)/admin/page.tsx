"use client";

import React from "react";
import MediaPage from "../../../../components/media";
import CreateEvent from "../../../../components/events";
import CreateSermonForm from "../../../../components/sermons/create-sermon-form";
import Navbar2 from "../../../../components/navbar/Navbar2";

import BlogCreator from "../../../../components/blogs/BlogCreator";
import {
  getAllUsers,
  getAuthUserDetails,
  getEventById,
  getSermonById,
} from "@/lib/queries";
import { Events, Role, User } from "@prisma/client";
import { useModal } from "@/providers/modal-provider";
import CustomModal from "../../../../components/global/custom-modal";
import UpdateUserForm from "../../../../components/admin/forms/UpdateUserForm";
import EditPage from "../../../../components/admin/EditPage";
import UpdateUser from "../../../../components/admin/UpdateUser";
import UpdateSermonForm from "../../../../components/admin/forms/UpdateSermonForm";
import UpdateEventForm from "../../../../components/admin/forms/UpdateEventForm";
import { EventsType, Sermon } from "@/lib/types";

const AdminPage = () => {
  const [user, setUser] = React.useState<string>();
  const [allUsers, setAllUsers] = React.useState<User[]>();
  const [refresh, setRefresh] = React.useState(false);
  const { setOpen, setClose } = useModal();

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
          setClose={setClose}
        />
      </CustomModal>
    );
  };

  const handleSermonEdit = async (id: number) => {
    const sermonFromDb = (await getSermonById(id)) as Sermon;
    if (!sermonFromDb) return alert("No Sermon provided!");
    setOpen(
      <CustomModal>
        <UpdateSermonForm
          sermon={sermonFromDb}
          setRefresh={setRefresh}
          setClose={setClose}
        />
      </CustomModal>
    );
  };
  const handleEventEdit = async (id: number) => {
    const eventFromDb = (await getEventById(id)) as EventsType;
    if (eventFromDb === null) return alert("No event found!");
    setOpen(
      <CustomModal>
        <UpdateEventForm
          oldEvent={eventFromDb}
          setRefresh={setRefresh}
          setClose={setClose}
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
        <UpdateUser
          allUsers={allUsers as User[]}
          handleEditClick={handleEditClick}
        />
        <EditPage
          handleSermonEdit={handleSermonEdit}
          handleEventEdit={handleEventEdit}
          refresh={refresh}
        />
      </section>
    </>
  );
};

export default AdminPage;
