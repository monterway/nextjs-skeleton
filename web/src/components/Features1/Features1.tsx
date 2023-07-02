import NextLink from '../NextLink/NextLink';

export interface Features1Props {
  features: {
    icon: string;
    title: string;
    description: string;
    button: {
      title: string;
      href: string;
    };
  }[];
}

const Features1 = (props: Features1Props): JSX.Element => {
  const { features } = props;

  return (
    <div className="container px-4 py-5">
      <div className="row g-5 row-cols-1 row-cols-lg-3">
        {features.map((feature, index) => (
          <div key={index} className="feature feature1 col">
            <div className="feature__icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
              <i className={`bi bi-${feature.icon}`}></i>
            </div>
            <h3 className="fs-2 text-body-emphasis">{feature.title}</h3>
            <p>{feature.description}</p>
            <NextLink
              title={
                <div>
                  {feature.button.title}
                  <i className="bi bi-chevron-right"></i>
                </div>
              }
              href={feature.button.href}
              className="icon-link"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features1;
