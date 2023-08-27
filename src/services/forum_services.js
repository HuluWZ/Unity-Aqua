const Forum = require("../models/forum/forum");
const ForumTopic = require("../models/forum/forum_topic");
const ForumBookmark = require("../models/forum/forum_bookmark");
const ApiResponse = require("../configs/api_response");
const ForumAnswer = require("../models/forum/forum_answer");
const ForumLike = require("../models/forum/forum_like");
const User = require("../models/user");
const ForumReply = require("../models/forum/forum_reply");
const ForumReplyLike = require("../models/forum/forum_reply_like");
const Fuse = require("fuse.js");
const TreatmentFramer = require("../models/treatment/treatment_farmer");
const News = require("../models/news");
const Book = require("../models/book");
const uploadToCloud = require("../configs/cloudnary");

const create = async (req, res) => {
  const forumTopic = await ForumTopic.findByPk(req.body.topicId);
  if (!forumTopic) return ApiResponse.error(res, "Topic not found", 200);

  var isNoImage = false;
  if (!req.files) {
    isNoImage = true;
    console.log("No Images");
  } else {
   const { imageUrl1, imageUrl2, imageUrl3 } = req.files;
  var imageUrls = [];

const fileUrls = [imageUrl1, imageUrl2, imageUrl3];
    // console.log(fileUrls);
for (const file of fileUrls) {
  if (file) {
    const { url } = await uploadToCloud(file[0].filename);
    console.log("URL", url);
    imageUrls.push(url);
  }
}

  }

  console.log(isNoImage,imageUrls)
  //Creating Forum
  let forum = await Forum.create({
    title: req.body.title,
    description: req.body.description,
    imageUrl1: isNoImage ? null : imageUrls[0],
    imageUrl2: isNoImage ? null : imageUrls[1],
    imageUrl3: isNoImage ? null : imageUrls[2],
    forumTopicId: req.body.topicId,
    userId: req.user.id ,
  });

  if (!forum) return ApiResponse.error(res, "Something Went Wrong", 200);

  return ApiResponse.success(res, forum);
};

const getAllForums = async (req, res) => {
  const { topicId } = req.query;

  let forumList = await Forum.findAll({
    where:
      topicId == null
        ? { status: "1" }
        : { forumTopicId: topicId, status: "1" },
    order: [["createdAt", "DESC"]],
    include: [
            {
        model: ForumAnswer,
        include: [
          { model: User },
          { model: ForumReply, include: User }
        ],
      },
      User,
      ForumTopic
    ]
  // }],
  });

  const editedForumList = new Array();
  for (const forum of forumList) {
    let bookmark = await ForumBookmark.findOne({
      where: { forumId: forum.id, userId: req.body.user.id },
    });
    var editedForum = forum.get();
    if (bookmark) {
      // forum.setDataValue["isBookmarked"] = true;
      editedForum.isBookmarked = true;
    } else {
      editedForum.isBookmarked = false;
    }
    for (let i = 0; i < editedForum.forum_answers?.length; i++) {
    for (
      let j = 0;
      j < editedForum.forum_answers[i].get().forum_replies.length;
      j++
    ) {
      let reply = editedForum.forum_answers[i].get().forum_replies[j];
      let likeReply = await ForumReplyLike.findOne({
        where: {
          forumReplyId: reply?.id,
          userId: req.body?.user?.id,
        },
      });
      if (likeReply) {
        reply.get().isLiked = true;
      } else {
        reply.get().isLiked = false;
      }
    }
  }


    editedForumList.push(editedForum);
  }
  if (!forumList) return ApiResponse.error(res, "Something Went Wrong", 200);

  return ApiResponse.success(res, editedForumList);
};
const deleteForum = async (req, res) => {
  const { forumId } = req.query;
  if (!forumId) return ApiResponse.error(res, "Forum ID Not Found", 400);
  let forumList = await Forum.update(
    {
      status: "2",
    },
    {
      where: { id: forumId },
    }
  );

  if (!forumList) return ApiResponse.error(res, "Something Went Wrong", 200);

  return ApiResponse.success(res, forumList);
};

const searchForum = async (req, res) => {
  const { search } = req.query;
  if (!search) return ApiResponse.error(res, "Forum ID Not Found", 400);
  let forumList = await Forum.findAll({
    where: {
      status: "1",
    },
    order: [["createdAt", "DESC"]],
  });
  let forums = [];
  forumList.map((foum) => forums.push(foum.get()));
  let fuse = new Fuse(forums, { keys: ["title"], includeScore: false });
  const searchedResult = fuse.search(search);
  console.log(searchedResult);

  const editedForumList = new Array();
  for (const searchItem of searchedResult) {
    let forum = searchItem.item;
    let bookmark = await ForumBookmark.findOne({
      where: { forumId: forum.id, userId: req.body.user.id },
    });
    if (bookmark) {
      // forum.setDataValue["isBookmarked"] = true;
      forum.isBookmarked = true;
    } else {
      forum.isBookmarked = false;
    }
    editedForumList.push(forum);
  }
  if (!editedForumList)
    return ApiResponse.error(res, "Something Went Wrong", 200);

  return ApiResponse.success(res, editedForumList);
};

const getAllForumTopics = async (req, res) => {
  console.log(" Get All ForumTopic ")
  let forumTopicList = await ForumTopic.findAll({
    order: [["createdAt", "DESC"]],
  }
);
  if (!forumTopicList)
    return ApiResponse.error(res, "Something Went Wrong", 200);

  return ApiResponse.success(res, forumTopicList);
};

const createForumTopic = async (req, res) => {
  let forumTopic = await ForumTopic.create({
    name: req.body.name,
  });
  if (!forumTopic) return ApiResponse.error(res, "Something Went Wrong", 400);
  return ApiResponse.success(res, forumTopic);
};

const updateForumTopic = async (req, res) => {
  const { forumTopicId } = req.query;
  if (!forumTopicId) return ApiResponse.error(res, "Topic Id not Found", 400);

  let forumTopic = await Forum.update(
    {
      name: req.body.name,
    },
    { where: { id: forumTopicId } }
  );
  if (!forumTopic) return ApiResponse.error(res, "Something Went Wrong", 400);
  return ApiResponse.success(res, forumTopic);
};

const getMyForums = async (req, res) => {
  let forumList = await Forum.findAll({
    where: { userId: req.body.user.id },
    order: [["createdAt", "DESC"]],
  });
  if (!forumList) return ApiResponse.error(res, "Something Went Wrong", 200);

  const editedForumList = new Array();

  for (const forum of forumList) {
    let bookmark = await ForumBookmark.findOne({
      where: { forumId: forum.id, userId: req.body.user.id },
    });
    var editedForum = forum.get();
    if (bookmark) {
      editedForum.isBookmarked = true;
    } else {
      editedForum.isBookmarked = false;
    }
    editedForumList.push(editedForum);
  }

  return ApiResponse.success(res, editedForumList);
};

const getMyBookmarks = async (req, res) => {
  let forumBookmarkList = await ForumBookmark.findAll({
    where: { userId: req.body.user.id },
    include: Forum,
    order: [["createdAt", "DESC"]],
  });
  if (!forumBookmarkList)
    return ApiResponse.error(res, "Something Went Wrong", 200);

  const editedForumList = new Array();

  for (let forumBookmark of forumBookmarkList) {
    var editedForumBookmark = forumBookmark.get();
    editedForumBookmark.forum.get().isBookmarked = true;
    editedForumList.push(editedForumBookmark.forum);
  }

  return ApiResponse.success(res, editedForumList);
};

const getMyAnswers = async (req, res) => {
  let userAnswers = await ForumAnswer.findAll({
    where: { userId: req.body.user.id },
    order: [["createdAt", "DESC"]],
  });
  if (!userAnswers) return ApiResponse.error(res, "Something Went Wrong", 200);

  return ApiResponse.success(res, userAnswers);
};

const getForumInfo = async (req, res) => {
  const { id } = req.params;
  
  console.log(" Get Forum Info ", req.body);
  let forum = await Forum.findByPk(id, {
    include: [
      {
        model: ForumAnswer,
        order: [["createdAt", "DESC"]],
        include: [
          { model: User },
          { model: ForumReply, include: User }
        ],
      },
      User,
      ForumTopic
    ],
  });

  if (!forum) return ApiResponse.error(res, "Something Went Wrong", 200);
  let like = await ForumLike.findOne({
    where: { forumId: forum.id, userId: req.body.user.id },
  });
  var editedForum = forum.get();
  if (like) {
    editedForum.isLiked = true;
  } else {
    editedForum.isLiked = false;
  }
  for (let i = 0; i < editedForum.forum_answers.length; i++) {
    for (
      let j = 0;
      j < editedForum.forum_answers[i].get().forum_replies.length;
      j++
    ) {
      let reply = editedForum.forum_answers[i].get().forum_replies[j];
      let likeReply = await ForumReplyLike.findOne({
        where: {
          forumReplyId: reply.id,
          userId: req.body.user.id,
        },
      });
      if (likeReply) {
        reply.get().isLiked = true;
      } else {
        reply.get().isLiked = false;
      }
    }
  }

  return ApiResponse.success(res, forum);
};

const bookmarkForum = async (req, res) => {
  // IF FORUM EXISTS
  const { forumId } = req.query;

  if (!forumId) return ApiResponse.error(res, "Forum Not Found", 200);
  const forum = await Forum.findByPk(forumId);
  if (!forum) return ApiResponse.error(res, "Forum Not Found", 200);

  // IF FORUM ALREADY BOOKMARKED
  let previousBoomark = await ForumBookmark.findOne({
    where: { forumId: forum.id, userId: req.body.user.id },
  });
  if (previousBoomark) return ApiResponse.success(res, previousBoomark);

  // CREATE NEW BOOKMARK
  let forumBoomark = await ForumBookmark.create({
    forumId: forum.id,
    userId: req.body.user.id,
  });
  return ApiResponse.success(res, forumBoomark);
};

const unbookmarkForum = async (req, res) => {
  // IF FORUM EXISTS
  const { forumId } = req.query;
  if (!forumId) return ApiResponse.error(res, "Forum Not Found", 200);
  const forum = await Forum.findByPk(forumId);
  if (!forum) return ApiResponse.error(res, "Forum Not Found", 200);

  // IF FORUM ALREADY BOOKMARKED
  let previousBoomark = await ForumBookmark.findOne({
    where: { forumId: forum.id, userId: req.body.user.id },
  });
  if (!previousBoomark)
    return ApiResponse.error(res, "Boomark doesn't exist", 200);

  await previousBoomark.destroy();
  return ApiResponse.success(res);
};

const answerForum = async (req, res) => {
  // IF FORUM EXISTS
  const forumId = req.body.forumId;
  if (!forumId) return ApiResponse.error(res, "Forum Not Found", 200);
  const forum = await Forum.findByPk(forumId);
  if (!forum) return ApiResponse.error(res, "Forum Not Found", 200);
  // console.log(" All Forum : ",forum,forumId)
  const imageUrls = new Array();
  var isNoImage = false;
  if (!req.files) {
    isNoImage = true;
    console.log("No Images");
  } else {
    const { imageUrl1, imageUrl2, imageUrl3 } = req.files;
    const files = [imageUrl1, imageUrl2, imageUrl3];
    if (!files) return ApiResponse.error(res, "Please upload an image", 200);

    for (let i = 0; i < files.length; i++) {
      let imgFileUrl;

      if (!files[i]) {
        imgFileUrl = null;
      } else {
        // If does not have image mime type prevent from uploading
        if (/^files[i]/.test(files[i].mimetype)) return res.sendStatus(400);
        imgFileUrl = __dirname + "/answer_upload/" + Date.now() + files[i].name;

        // Move the uploaded image to our upload folder
        await files[i].mv(imgFileUrl);
        imgFileUrl = imgFileUrl.substring(imgFileUrl.indexOf("admin"));
        imgFileUrl = "https://" + imgFileUrl;
      }

      imageUrls.push(imgFileUrl);
    }
  }

  let forumAnswer = await ForumAnswer.create({
    content: req.body.content,
    imageUrl1: isNoImage ? null : imageUrls[0],
    imageUrl2: isNoImage ? null : imageUrls[1],
    imageUrl3: isNoImage ? null : imageUrls[2],
    userId: req.body.user.id,
    forumId: forum.id,
  });

  if (!forumAnswer) return ApiResponse.error(res, "Something went wrong", 200);
  return ApiResponse.success(res, forumAnswer);
};

const replyAnswerForum = async (req, res) => {
  // IF FORUM EXISTS
  const { forumAnswerId } = req.body;
  if (!forumAnswerId)
    return ApiResponse.error(res, "Forum Answer Not Found", 200);
  const forumAnswer = await ForumAnswer.findByPk(forumAnswerId);
  console.log(" Form Ans ",forumAnswer)
  if (!forumAnswer)
    return ApiResponse.error(res, "Forum Answer Not Found", 200);

  let forumReply = await ForumReply.create({
    content: req.body.content,
    userId: req.body.user.id,
    forumAnswerId: forumAnswer.id,
  });

  if (!forumReply) return ApiResponse.error(res, "Something went wrong", 200);
  return ApiResponse.success(res, forumReply);
};

const likeForum = async (req, res) => {
  // IF FORUM EXISTS
  const { forumId } = req.query;

  if (!forumId) return ApiResponse.error(res, "Forum Not Found", 200);
  const forum = await Forum.findByPk(forumId);
  if (!forum) return ApiResponse.error(res, "Forum Not Found", 200);

  // IF FORUM ALREADY BOOKMARKED
  let previousLike = await ForumLike.findOne({
    where: { forumId: forum.id, userId: req.body.user.id },
  });
  if (previousLike) return ApiResponse.success(res, previousLike);

  // CREATE NEW LIKE
  let forumLike = await ForumLike.create({
    forumId: forum.id,
    userId: req.body.user.id,
  });
  return ApiResponse.success(res, forumLike);
};

const unLikeForum = async (req, res) => {
  // IF FORUM EXISTS
  const { forumId } = req.query;
  if (!forumId) return ApiResponse.error(res, "Forum Not Found", 200);
  const forum = await Forum.findByPk(forumId);
  if (!forum) return ApiResponse.error(res, "Forum Not Found", 200);

  // IF FORUM ALREADY LIKED
  let previousLike = await ForumLike.findOne({
    where: { forumId: forum.id, userId: req.body.user.id },
  });
  if (!previousLike) return ApiResponse.error(res, "Like doesn't exist", 200);

  await previousLike.destroy();
  return ApiResponse.success(res);
};

const likeForumReply = async (req, res) => {
  // IF FORUM EXISTS
  const { forumReplyId } = req.query;

  if (!forumReplyId)
    return ApiResponse.error(res, "Forum Reply Not Found", 200);
  const forumReply = await ForumReply.findByPk(forumReplyId);
  if (!forumReply) return ApiResponse.error(res, "Forum Reply Not Found", 200);

  // IF FORUM ALREADY BOOKMARKED
  let previousLike = await ForumReplyLike.findOne({
    where: { forumReplyId: forumReply.id, userId: req.body.user.id },
  });
  if (previousLike) return ApiResponse.success(res, previousLike);

  // CREATE NEW LIKE
  let forumReplyLike = await ForumReplyLike.create({
    forumReplyId: forumReply.id,
    userId: req.body.user.id,
  });
  return ApiResponse.success(res, forumReplyLike);
};

const unLikeForumReply = async (req, res) => {
  // IF FORUM EXISTS
  const { forumReplyId } = req.query;
  if (!forumReplyId) return ApiResponse.error(res, "Forum Not Found", 200);
  const forumReply = await ForumReply.findByPk(forumReplyId);
  if (!forumReply) return ApiResponse.error(res, "Forum Not Found", 200);

  // IF FORUM ALREADY LIKED
  let previousLike = await ForumReplyLike.findOne({
    where: { forumReplyId: forumReply.id, userId: req.body.user.id },
  });
  if (!previousLike) return ApiResponse.error(res, "Like doesn't exist", 200);

  await previousLike.destroy();
  return ApiResponse.success(res);
};


const getAllDetails = async (req, res) => {
  // IF FORUM EXISTS
  const {id} = req.params
  if (!id)
    return ApiResponse.error(res, "User Id Not Found", 200);
  const forumAnswer = await ForumAnswer.findAll({where:{userId:id},include:[Forum]});
  const forum = await Forum.findAll({where:{userId:id},include:[ForumTopic]});
  const forumReply = await ForumReply.findAll({where:{userId:id},include:[ForumAnswer]});
  const forumLike = await ForumLike.findAll({where:{userId:id}});

  return ApiResponse.success(res, {reply: forumReply,answer:forumAnswer,forum:forum,like:forumLike});
};

module.exports = {
  create,
  getAllForums,
  deleteForum,
  searchForum,
  getAllForumTopics,
  getMyForums,
  getMyAnswers,
  getMyBookmarks,
  bookmarkForum,
  unbookmarkForum,
  answerForum,
  getForumInfo,
  likeForum,
  unLikeForum,
  replyAnswerForum,
  likeForumReply,
  unLikeForumReply,
  createForumTopic,
  updateForumTopic,
  getAllDetails
};
