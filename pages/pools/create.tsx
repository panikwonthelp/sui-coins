import { NextPage } from 'next';
import { values } from 'ramda';
import { FormProvider, useForm } from 'react-hook-form';

import { SEO } from '@/components';
import { ModalProvider } from '@/context/modal';
import { useNetwork } from '@/context/network';
import CreatePool from '@/views/create-pool';
import { IPoolForm } from '@/views/create-pool/create-pool.types';
import { COINS } from '@/views/pools/coins';

const CreatePoolPage: NextPage = () => {
  const { network } = useNetwork();
  const form = useForm<IPoolForm>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      tokenA: {
        value: '0',
        ...values(COINS[network])[0],
      },
      tokenB: {
        value: '0',
        ...values(COINS[network])[1],
      },
    },
  });

  return (
    <FormProvider {...form}>
      <ModalProvider>
        <SEO pageTitle="Create Pool" />
        <CreatePool />
      </ModalProvider>
    </FormProvider>
  );
};

export default CreatePoolPage;
