import React from 'react';
import Page from '../src/components/Page/Page';
import Hero1 from '../src/components/Hero1/Hero1';

const Index = (): JSX.Element => {
  return (
    <Page>
      <Hero1
        title="Test"
        description="Testing with description"
        buttons={[
          {
            type: 'primary',
            title: 'Get started',
            href: '/'
          },
          {
            type: 'outline-secondary',
            title: 'Docs',
            href: '/'
          }
        ]}
        image={{
          path: 'https://getbootstrap.com/docs/5.3/examples/heroes/bootstrap-docs.png',
          alt: 'Image description'
        }}
      />
    </Page>
  );
};

export default Index;
