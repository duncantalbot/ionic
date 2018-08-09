export interface Feedback{
  firstname: string;
  lastname: string;
  tel: string;
  email: string;
  agree: boolean;
  contacttype: string;
  message: string;
}
export const ContactType = ['None', 'Tel', 'Email'];
