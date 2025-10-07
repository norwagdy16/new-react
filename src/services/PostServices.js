// /** @format */

// import axios from "axios";

// export async function getAllPosts() {
//   try {
//     const { data } = await axios.get(
//       `https://linked-posts.routemisr.com/posts`,
//       {
//         headers: {
//           token: localStorage.getItem("token"),
//         },
//         params: {
//           limit: 30,
//           sort: "-createdAt",
//         },
//       }
//     );
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// }

// export async function getSinglePosts(postId) {
//   try {
//     const { data } = await axios.get(
//       `https://linked-posts.routemisr.com/posts/${postId}`,
//       {
//         headers: {
//           token: localStorage.getItem("token"),
//         },
//       }
//     );
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// }

// export async function createPostApi(formData) {
//   try {
//     const { data } = await axios.post(
//       `https://linked-posts.routemisr.com/posts`,
//       formData,
//       {
//         headers: {
//           token: localStorage.getItem("token"),
//         },
//       }
//     );
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// }

// export async function updatePostApi(postId, formData) {
//   try {
//     const { data } = await axios.put(
//       `https://linked-posts.routemisr.com/posts/${postId}`,
//       formData,
//       {
//         headers: {
//           token: localStorage.getItem("token"),
//         },
//       }
//     );
//     console.log("update:", data);
//     return data;
//   } catch (error) {
//     console.log(error);
//     return { message: "error" };
//   }
// }

// export async function deletePostApi(postId) {
//   try {
//     const { data } = await axios.delete(
//       `https://linked-posts.routemisr.com/posts/${postId}`,
//       {
//         headers: {
//           token: localStorage.getItem("token"),
//         },
//       }
//     );
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// }
/** @format */
import axios from "axios";

// 🌍 عنوان الـ API على Railway
const API_BASE_URL = "https://new-react-production.up.railway.app/api/posts";

// 🟢 Get all posts
export async function getAllPosts() {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.get(API_BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit: 30,
        sort: "-createdAt",
      },
    });
    console.log("✅ All Posts:", data);
    return data;
  } catch (error) {
    console.error("❌ getAllPosts Error:", error.response?.data || error.message);
    return error.response?.data;
  }
}

// 🟢 Get single post by ID
export async function getSinglePost(postId) {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.get(`${API_BASE_URL}/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("✅ Single Post:", data);
    return data;
  } catch (error) {
    console.error("❌ getSinglePost Error:", error.response?.data || error.message);
    return error.response?.data;
  }
}

// 🟢 Create a new post
// 🟢 Create a new post
export async function createPostApi(postData) {
  try {
    const token = localStorage.getItem("token");

    // ✅ هنا بنبعت JSON لأن الصورة بقت URL مش ملف
    const { data } = await axios.post(API_BASE_URL, postData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("✅ Post Created:", data);
    return data;
  } catch (error) {
    console.error(
      "❌ createPostApi Error:",
      error.response?.data || error.message
    );
    return error.response?.data;
  }
}


// 🟢 Update post
export async function updatePostApi(postId, { body, imageFile, oldImage }) {
  try {
    const token = localStorage.getItem("token");
    let imageUrl = oldImage;

    // ✅ لو في صورة جديدة نرفعها للسيرفر الأول
    if (imageFile) {
      const uploadData = new FormData();
      uploadData.append("file", imageFile);

      const uploadRes = await axios.post(
        "https://new-react-production.up.railway.app/api/upload",
        uploadData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      imageUrl = uploadRes.data.url;
    }

    // 🔹 بعد الرفع نحدث البوست
    const { data } = await axios.put(
      `${API_BASE_URL}/${postId}`,
      { body, image: imageUrl },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("✅ Post Updated:", data);
    return data;
  } catch (error) {
    console.error(
      "❌ updatePostApi Error:",
      error.response?.data || error.message
    );
    return error.response?.data;
  }
}


// 🟢 Delete post
export async function deletePostApi(postId) {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.delete(`${API_BASE_URL}/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("🗑️ Post Deleted:", data);
    return data;
  } catch (error) {
    console.error("❌ deletePostApi Error:", error.response?.data || error.message);
    return error.response?.data;
  }
}

