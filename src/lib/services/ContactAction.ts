import GetToken from './auth/GetToken';
import { ContactSchema } from '../validation/ContactSchema';
import { ContactActionForm } from '@/types/ContactAction';

export default async function ContactAction(state: ContactActionForm, formData: FormData): Promise<ContactActionForm> {
      const token = await GetToken();
        
      const formValues = {
        message: formData.get("message") as string,
      };
    
      const validationFeildes = ContactSchema.safeParse(formValues);
      if (!validationFeildes.success) {
        return {
          errors: validationFeildes.error.flatten().fieldErrors,
          data: formValues,
          message: '',
          success: false
        };
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/contact`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formValues),
      });
  
      if (!res.ok) {
        const errorsData = await res.json();
        return {
          errors: errorsData.errors,
          data: formValues,
          success: false,
          message: ''
        };
      }
      const data = await res.json();
      return {
        errors: {},
        data: {},
        success: true,
        message: data.message
      }
}
