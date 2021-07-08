import { $host } from './axios';

export const createType = async (type) => {
   const { data } = await $host.post('api/type', type);
   return data;
};

export const fetchTypes = async () => {
   const { data } = await $host.get('api/type');
   return data;
};

export const createPost = async (post) => {
   const { data } = await $host.post('api/picture', post);
   return data;
};

export const fetchPost = async (typeId, userId, author) => {
   const { data } = await $host.get('api/picture', {
      params: {
         typeId,
         userId,
         author,
      },
   });
   return data;
};

export const fetchOnePost = async (id) => {
   const { data } = await $host.get('api/picture/' + id);
   return data;
};

export const deletePost = async (id) => {
   const { data } = await $host.delete('api/picture/' + id);
   return data;
};

export const createComment = async (comment) => {
   const { data } = await $host.post('api/comment/', comment);
   return data;
};

export const fetchComment = async (comment, author, userId, pictureId) => {
   const { data } = await $host.get('api/comment/', {
      params: {
         comment,
         author,
         userId,
         pictureId,
      },
   });
   return data;
};
