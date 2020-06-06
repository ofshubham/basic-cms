const post = require("../db/models/post");

module.exports = {
  //done
  getById: async function (id, slug) {
    const response = { msg: "FAILURE", data: null };
    try {
      let postData = null;
      if (slug) {
        postData = await post.findOne({ slug: id });
      } else {
        postData = await post.findOne({ _id: id });
      }

      if (postData) {
        response.data = postData;
        response.msg = "SUCCESS";
      }
      return response;
    } catch (err) {
      return response;
    }
  },
  //done
  getAll: async function (dest, draw, length, start) {
    const response = { msg: "FAILURE", data: null };
    try {
      let posts = [];
      if (dest == "cms") {
        posts = await post.find({}, [], {
          sort: { created_at: -1 },
          skip: parseInt(start),
          limit: parseInt(length),
        });
        let formattedPosts = await this.formatForTable(posts);
        response.draw = draw;
        response.recordsTotal = formattedPosts.length;
        response.recordsFiltered = formattedPosts.length;
        response.msg = "SUCCESS";
        response.data = formattedPosts;
        return response;
      } else {
        posts = await post.find({}).sort({ created_at: -1 });
        response.msg = "SUCCESS";
        response.data = posts;
        return response;
      }
    } catch (err) {
      return response;
    }
  },
  //done
  insertPost: async function (postObj) {
    let response = { msg: "FAILURE", data: null };
    try {
      const {
        title,
        tagline,
        content,
        description,
        created_at,
        updated_at,
        updated_by,
        user_id,
      } = postObj;
      const postSaved = await post.create({
        title: title,
        tagline: tagline,
        content: content,
        description: description,
        created_at: created_at,
        created_by: user_id,
        updated_at: updated_at,
        updated_by: updated_by,
      });
      if (postSaved) {
        (response.msg = "SUCCESS"), (response.data = postSaved);
        return response;
      }
    } catch (err) {
      return response;
    }
  },
  //done
  editPost: async function (postObj) {
    const { _id, ...postDataWithOutID } = postObj;
    const response = { msg: "FAILURE", data: null };
    try {
      const editResponse = await post.updateOne(
        { _id: _id },
        postDataWithOutID
      );
      if (editResponse.nModified) {
        response.msg = "SUCCESS";
        return response;
      } else {
        return response;
      }
    } catch (err) {
      return response;
    }
  },
  //done
  deletePost: async function (id) {
    const response = { msg: "FAILURE", data: null };
    try {
      const deleteResponse = await post.deleteOne({ _id: id });
      if (deleteResponse.deletedCount) {
        response.msg = "SUCCESS";
        return response;
      } else {
        return response;
      }
    } catch (err) {
      return response;
    }
  },
  //done
  formatForTable: async function (posts) {
    let returnPosts = [];
    posts.forEach((doc) => {
      var d = [doc.title, doc.created_at, doc["_id"]];
      returnPosts.push(d);
    });
    return returnPosts;
  },
};
