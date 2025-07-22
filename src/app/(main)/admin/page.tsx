"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MediaPage from "../../../../components/media";
import CreateEvent from "../../../../components/events/CreateEvent";
import CreateSermonForm from "../../../../components/sermons/create-sermon-form";
import Navbar2 from "../../../../components/navbar/Navbar2";

import BlogCreator from "../../../../components/blogs/BlogCreator";
import {
  getAllUsers,
  getAuthUserDetails,
  getBlogWithId,
  getEventById,
  getSermonById,
  isUserOwner,
} from "@/lib/queries";
import { Events, Role, User } from "@prisma/client";
import { useModal } from "@/providers/modal-provider";
import CustomModal from "../../../../components/global/custom-modal";
import UpdateUserForm from "../../../../components/admin/forms/UpdateUserForm";
import EditPage from "../../../../components/admin/EditPage";
import UpdateUser from "../../../../components/admin/UpdateUser";
import UpdateSermonForm from "../../../../components/admin/forms/UpdateSermonForm";
import UpdateEventForm from "../../../../components/admin/forms/UpdateEventForm";
import { BlogType, EventsType, Sermon } from "@/lib/types";
import UpdateBlogForm from "../../../../components/admin/forms/UpdateBlogForm";

const AdminPage = () => {
  const [user, setUser] = React.useState<User>();
  const [allUsers, setAllUsers] = React.useState<User[]>();
  const [refresh, setRefresh] = React.useState(false);
  const { setOpen, setClose } = useModal();

  React.useEffect(() => {
    // Fetch authenticated user details
    const getInfo = async () => {
      const response = (await getAuthUserDetails()) as User;
      setUser(response);
    };

    // Fetch all users
    const getData = async () => {
      const users = await getAllUsers();
      setAllUsers(users);
    };

    getData();
    getInfo();
  }, [refresh]); // 🔄 Re-run effect when `refresh` changes

  // const handleSermonEdit = async (id: number) => {
  //   const sermonFromDb = (await getSermonById(id)) as Sermon;
  //   if (!sermonFromDb) return alert("No Sermon provided!");
  //   setOpen(
  //     <CustomModal>
  //       <UpdateSermonForm
  //         sermon={sermonFromDb}
  //         setRefresh={setRefresh}
  //         setClose={setClose}
  //       />
  //     </CustomModal>
  //   );
  // };

  const handleBlogEdit = async (id: string) => {
    const blogFromDb = (await getBlogWithId(id)) as BlogType;
    if (!blogFromDb) return alert("No Blog provided!");
    setOpen(
      <CustomModal>
        <UpdateBlogForm
          blog={blogFromDb}
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
    <section className="w-full h-full px-10">
      <h1 className="flex items-center justify-center text-xl mt-8">
        Admin Page
      </h1>
      <Tabs defaultValue="media" className="w-full h-auto">
        <TabsList>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="blogs">Blogs</TabsTrigger>
          <TabsTrigger value="edit">Edit</TabsTrigger>
        </TabsList>
        <TabsContent value="media">
          <MediaPage />
        </TabsContent>
        <TabsContent value="events">
          <CreateEvent />
        </TabsContent>
        <TabsContent value="blogs">
          <BlogCreator userId={user?.id!!} />
        </TabsContent>

        <TabsContent value="users">
          <UpdateUser
            allUsers={allUsers as User[]}
            setRefresh={setRefresh}
            setClose={setClose}
            user={user?.name!!}
          />
        </TabsContent>
        <TabsContent value="edit">
          <EditPage
            handleEventEdit={handleEventEdit}
            handleBlogEdit={handleBlogEdit}
            refresh={refresh}
            setRefresh={setRefresh}
          />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default AdminPage;
