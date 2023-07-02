import { ImageType } from '../../types/ImageType';
import NextLink from '../NextLink/NextLink';

export interface Hero1Props {
  title: string;
  description: string;
  buttons: {
    title: string;
    href: string;
    type: 'primary' | 'outline-secondary';
  }[];
  image: ImageType;
}

const Hero1 = (props: Hero1Props): JSX.Element => {
  const { title, description, buttons, image } = props;

  return (
    <div className="px-4 pt-5 my-5 text-center border-bottom">
      <h1 className="display-4 fw-bold text-body-emphasis">{title}</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">{description}</p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
          {buttons.map((button, index) => (
            <NextLink
              key={index}
              title={button.title}
              href={button.href}
              className={`btn btn-${button.type} btn-lg px-4 me-sm-3`}
            />
          ))}
        </div>
      </div>
      <div
        className="overflow-hidden"
        style={{
          maxHeight: '30vh'
        }}
      >
        <div className="container px-5">
          <img
            src={image.path}
            className="img-fluid border rounded-3 shadow-lg mb-4"
            alt={image.alt}
            width="700"
            height="500"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero1;
