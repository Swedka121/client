import { create } from "zustand";
import { useStorageStore } from "./storageStore";
import { gql } from "@apollo/client";
import { useAuthStore } from "./authStore";
import { useNavigate } from "react-router";
import { router } from "../app";

interface CourseStoreI {
  create_baner: string;
  create_avatar: string;
  create_name: string;
  detailed_name: string;
  detailed_avatar: string;
  detailed_baner: string;
  detailed_teacher_name: string;
  detailed_teacher_avatar: string;
  detailed_role: number;
  detailed_id: number;
  detailed_code: string;
  members: { name: string; avatar: string; role: number }[];
  materials: {
    title: string;
    data: string;
    createdAt: Date;
    id: number;
  }[];
  courses: Map<
    number,
    {
      name: string;
      avatar: string;
      my_role: "Teacher" | "Student";
      id: number;
      teacher_member: { avatar: string; name: string };
    }
  >;
  selectedRole: string;
  setBanerCreate: (baner: File) => Promise<void>;
  setAvatarCreate: (avatar: File) => Promise<void>;
  setNameCreate: (name: string) => Promise<void>;
  setSelectedRole: (role: string) => void;
  create: () => Promise<void>;
  createMaterial: (title: string, data: string) => Promise<void>;
  load: () => Promise<void>;
  loadDetailedCourse: (id: number) => Promise<void>;
  getFiltredCourses: () => {
    name: string;
    avatar: string;
    my_role: "Teacher" | "Student";
    id: number;
    teacher_member: { avatar: string; name: string };
  }[];
  addCourseByCode: (code: string) => Promise<void>;
  deleteMaterial: (materialId: number) => Promise<void>;
  deleteCourse: (courseId: number) => Promise<void>;
}

const CREATE_COURSE_MUTATION = gql`
  mutation CreateCourse(
    $name: String!
    $avatar: String!
    $wide_screen_avatar: String!
  ) {
    create_course(
      create_course_dto: {
        name: $name
        avatar: $avatar
        wide_screen_avatar: $wide_screen_avatar
      }
    ) {
      id
    }
  }
`;

const GET_COURSES = gql`
  query {
    get_my_courses {
      role
      course {
        id
        name
        avatar
        members {
          role
          user {
            profile {
              name
              avatar
            }
          }
        }
      }
    }
  }
`;

const GET_DETAILED_COURSE = gql`
  query DetailedCourse($id: Float!) {
    get_my_course_by_id(id: $id) {
      role
      course {
        id
        name
        wide_screen_avatar
        avatar
        code
        members {
          role
          user {
            profile {
              name
              avatar
            }
          }
        }
        materials {
          id
          data
          title
          createdAt
        }
      }
    }
  }
`;

const ADD_MATERIAL = gql`
  mutation AddMaterial($courseId: Float!, $title: String!, $data: String!) {
    add_material(
      courseId: $courseId
      material_input: { title: $title, data: $data }
    ) {
      id
    }
  }
`;

const ADD_COURSE_BY_CODE = gql`
  mutation AddMember($courseCode: String!) {
    add_member(courseCode: $courseCode) {
      id
    }
  }
`;

const DELETE_COURSE = gql`
  mutation DeleteCourse($courseId: Float!) {
    delete_course(courseId: $courseId)
  }
`;

const DELETE_MATERIAL = gql`
  mutation DeleteMaterial($courseId: Float!, $materialId: Float!) {
    delete_material(courseId: $courseId, materialId: $materialId)
  }
`;

export const useCourseStore = create<CourseStoreI>((set, get) => ({
  create_avatar: "default_avatar.png",
  create_baner: "default_banner.jpg",
  create_name: "course name",
  courses: new Map(),
  detailed_avatar: "",
  detailed_baner: "",
  detailed_name: "",
  detailed_teacher_name: "",
  detailed_teacher_avatar: "",
  detailed_role: 0,
  detailed_id: 0,
  detailed_code: "",
  members: [],
  materials: [],
  selectedRole: "All",
  getFiltredCourses: () => {
    const toReturn = Array.from(get().courses.values());

    if (get().selectedRole == "All") return toReturn;

    return toReturn.filter((a) => a.my_role == get().selectedRole);
  },
  setSelectedRole: (role: string) => {
    set((prev) => ({ ...prev, selectedRole: role }));
  },
  load: async () => {
    if (!useAuthStore.getState().client) return;

    const result = await useAuthStore.getState().client.query<{
      get_my_courses: {
        role: number;
        course: {
          id: number;
          name: string;
          avatar: string;
          members: {
            role: number;
            user: {
              profile: {
                name: string;
                avatar: string;
              };
            };
          }[];
        };
      }[];
    }>({ query: GET_COURSES, fetchPolicy: "no-cache" });

    const map = new Map<
      number,
      {
        name: string;
        avatar: string;
        my_role: "Teacher" | "Student";
        id: number;
        teacher_member: { avatar: string; name: string };
      }
    >();

    result.data.get_my_courses.forEach((el) => {
      map.set(el.course.id, {
        name: el.course.name,
        avatar: el.course.avatar,
        id: el.course.id,
        my_role: el.role == 1 ? "Teacher" : "Student",
        teacher_member: el.course.members.find((a) => a.role == 1).user.profile,
      });
    });

    set((prev) => ({ ...prev, courses: map }));
  },
  loadDetailedCourse: async (id: number) => {
    if (!useAuthStore.getState().client) return;

    const result = await useAuthStore.getState().client.query<{
      get_my_course_by_id: {
        role: number;
        course: {
          id: number;
          name: string;
          wide_screen_avatar: string;
          avatar: string;
          code: string;
          members: {
            role: number;
            user: {
              profile: {
                name: string;
                avatar: string;
              };
            };
          }[];
          materials: {
            title: string;
            data: string;
            createdAt: Date;
            id: number;
          }[];
        };
      };
    }>({ query: GET_DETAILED_COURSE, fetchPolicy: "no-cache", variables: { id } });

    set((prev) => ({
      ...prev,
      detailed_name: result.data.get_my_course_by_id.course.name,
      detailed_baner: result.data.get_my_course_by_id.course.wide_screen_avatar,
      detailed_avatar: result.data.get_my_course_by_id.course.avatar,
      detailed_id: id,
      detailed_code: result.data.get_my_course_by_id.course.code,
      detailed_role: result.data.get_my_course_by_id.role,
      materials: result.data.get_my_course_by_id.course.materials,
    }));
  },
  setAvatarCreate: async (avatar: File) => {
    const filePath = await useStorageStore.getState().loadFile(avatar);
    set((prev) => ({ ...prev, create_avatar: filePath }));
  },
  setBanerCreate: async (baner: File) => {
    const filePath = await useStorageStore.getState().loadFile(baner);
    set((prev) => ({ ...prev, create_baner: filePath }));
  },
  setNameCreate: async (name: string) => {
    set((prev) => ({ ...prev, create_name: name }));
  },
  create: async () => {
    if (!useAuthStore.getState().client) return;

    const result = await useAuthStore
      .getState()
      .client.mutate<{ create_course: { id: number } }>({
        mutation: CREATE_COURSE_MUTATION,
        variables: {
          name: get().create_name,
          avatar: get().create_avatar,
          wide_screen_avatar: get().create_baner,
        },
      });

    await get().load();

    router.navigate(`/app/course/${result.data.create_course.id}`);
  },
  createMaterial: async (title: string, data: string) => {
    if (!useAuthStore.getState().client) return;

    const result = await useAuthStore.getState().client.mutate({
      mutation: ADD_MATERIAL,
      variables: { courseId: get().detailed_id, title, data },
    });

    await get().loadDetailedCourse(get().detailed_id);
  },
  addCourseByCode: async (code: string) => {
    if (!useAuthStore.getState().client) return;

    const result = await useAuthStore.getState().client.mutate({
      mutation: ADD_COURSE_BY_CODE,
      variables: { courseCode: code },
    });

    await get().load();
  },
  deleteMaterial: async (materialId: number) => {
    if (!useAuthStore.getState().client) return;

    const result = await useAuthStore.getState().client.mutate({
      mutation: DELETE_MATERIAL,
      variables: { materialId, courseId: get().detailed_id },
    });

    await get().loadDetailedCourse(get().detailed_id);
  },
  deleteCourse: async () => {
    if (!useAuthStore.getState().client) return;

    const result = await useAuthStore.getState().client.mutate({
      mutation: DELETE_COURSE,
      variables: { courseId: get().detailed_id },
    });

    await get().load();
  },
}));
