'use client';

import {
  useSessionContext,
  useSupabaseClient,
} from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useEffect } from 'react';

import useAuthModal from '@/hooks/useAuthModal';

import Modal from './Modal';

const AuthModal = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();
  const { onClose, isOpen } = useAuthModal();

  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Modal
      title="Bienvenue"
      description="Connectez votre compte"
      isOpen={isOpen}
      onChange={onChange}
    >
      <Auth
        theme="dark"
        magicLink
        providers={['github']}
        supabaseClient={supabaseClient}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: { colors: { brand: '#404040', brandAccent: '#22c55e' } },
          },
        }}
        localization={{
          variables: {
            sign_up: {
              email_label: 'Adresse e-mail',
              password_label: 'Mot de passe',
              email_input_placeholder: 'Votre adresse e-mail',
              password_input_placeholder: 'Votre mot de passe',
              button_label: "S'inscrire",
              loading_button_label: 'Inscription ...',
              social_provider_text: "S'inscrire avec {{provider}}",
              link_text: 'Pas de compte ? Inscrivez-vous',
              confirmation_text:
                'Vérifiez votre boîte de réception pour le lien de confirmation',
            },
            sign_in: {
              email_label: 'Adresse e-mail',
              password_label: 'Mot de passe',
              email_input_placeholder: 'Votre adresse e-mail',
              password_input_placeholder: 'Votre mot de passe',
              button_label: 'Se connecter',
              loading_button_label: 'Connexion ...',
              social_provider_text: "S'identifier avec {{provider}}",
              link_text: 'Déjà un compte ? Connectez-vous',
            },
            magic_link: {
              email_input_label: 'Adresse e-mail',
              email_input_placeholder: 'Votre adresse e-mail',
              button_label: 'Envoyer le lien magique',
              loading_button_label: 'Envoi du lien magique ...',
              link_text: 'Envoie un e-mail contenant un lien magique',
              confirmation_text:
                'Vérifiez votre boîte de réception pour le lien magique',
            },
            forgotten_password: {
              email_label: 'Adresse e-mail',
              password_label: 'Mot de passe',
              email_input_placeholder: 'Votre adresse e-mail',
              button_label:
                'Envoyer les instructions de réinitialisation de mot de passe',
              loading_button_label: 'Envoie des instructions ...',
              link_text: 'Vous avez oublié votre mot de passe ?',
              confirmation_text:
                'Vérifiez votre boîte de réception pour le lien de confirmation de réinitialisation',
            },
          },
        }}
      />
    </Modal>
  );
};

export default AuthModal;
