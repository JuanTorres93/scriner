import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRowVertical from '../../ui/FormRowVertical';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSignup } from './hooks/useSignup';

function SignupForm() {
  const { signup, isLoading } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ fullName, email, password }) {
    signup(
      { fullName, email, password },
      {
        onSettled: () => {
          reset();
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRowVertical label="Tu nombre" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isLoading}
          {...register('fullName', { required: 'Este campo es obligatorio' })}
        />
      </FormRowVertical>

      <FormRowVertical label="Tu email" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register('email', {
            required: 'Este campo es obligatorio',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message:
                'Por favor ingresa una dirección de correo electrónico válida',
            },
          })}
        />
      </FormRowVertical>

      <FormRowVertical
        label="Contraseña (mínimo 8 caracteres)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isLoading}
          {...register('password', {
            required: 'Este campo es obligatorio',
            minLength: {
              value: 8,
              message: 'La contraseña debe tener al menos 8 caracteres',
            },
          })}
        />
      </FormRowVertical>

      <FormRowVertical
        label="Repetir contraseña"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register('passwordConfirm', {
            required: 'Este campo es obligatorio',
            validate: (value) =>
              value === getValues().password || 'Las contraseñas no coinciden',
          })}
        />
      </FormRowVertical>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={isLoading}>
          Restablecer
        </Button>
        <Button disabled={isLoading}>Crear nuevo usuario</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
