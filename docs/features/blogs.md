# Blog Feature

This feature is for the pastor to post blog like sermons, teachings he may be going through, or a place for him to post other teachings he would like to share with the church members. This can be helpful for allowing users to go back to sermons that they might want to get from the technical team.This helps address the current issue of church members asking people in the technical department to send the sermon of the pastor to their personal emails.

## Brain Dump:

- I want the format of this to be like the Dribble blogs section.
  ![Dribble Blog Page](public/docs/Dribble_Blog_Page.png)
- Maybe in a later time add the ability for users to comment under posts
  - And add te ability for admin users like the pastors, assistant pastors, deacons etc to post their findings with the approval of the pastor.
    - Will have to create an additional system that, when an admin posts something it goes into a queue, where when the queue is updated theres a request sent to the pastor for approval, the admin will also get a client side notification , notifying them that it has been sent for approval to the pastor. Pastor will have the ability to read and either approve or deny (with a denial note), the blog post.
-

## What to store

- Blog Title
- Brief description
- Date it was posted
- Blog poster image
- Blog writing

## Blog Architecture

![Events Architecture](public/docs/Blogs_Architecture.png)
