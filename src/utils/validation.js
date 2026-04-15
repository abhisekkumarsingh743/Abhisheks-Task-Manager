import * as yup from 'yup';

export const taskSchema = yup.object().shape({
  title: yup.string()
    .required("Task Title is required")
    .max(15, "Title must be 15 characters or less"), 
  assignee: yup.string()
    .required("Assignee is required")
    .max(20, "Assignee must be 20 characters or less")
    .matches(/^[a-zA-Z0-9 ]*$/, "No special characters allowed"), 
  deadline: yup.date()
    .min(new Date(new Date().setHours(0,0,0,0)), "No past dates allowed")
    .nullable()
    .default(() => {
      const date = new Date();
      return new Date(date.getFullYear(), date.getMonth() + 1, 0);
    }),
  status: yup.string().oneOf(['todo', 'running', 'completed']).required()
});