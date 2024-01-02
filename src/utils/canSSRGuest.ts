import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { parseCookies } from 'nookies';

export function CanSSRGuest<P>(fn: GetServerSideProps<P>){
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);

    const token = cookies['@barber.token'];

    if(token){
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false,
        },
      };
    };

    return await fn(ctx);
  };
};