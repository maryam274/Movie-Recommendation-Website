import publicClient from "../client/public.client";


// Person Endpoints
const personEndpoints = {
  detail: ({ personId }) => `person/${personId}`,
  medias: ({ personId }) => `person/${personId}/medias`
};


// Person Api
const personApi = {
  detail: async ({ personId }) => {
    try {
      const response = await publicClient.get(personEndpoints.detail({ personId }));

      return { response };
    } catch (err) { return { err }; }
  },
  medias: async ({ personId }) => {
    try {
      const response = await publicClient.get(personEndpoints.medias({ personId }));

      return { response };
    } catch (err) { return { err }; }
  }
};

export default personApi;