const MailingConfig: {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  fromName: string;
  fromEmail: string;
} = {
  host: "",
  port: 465,
  secure: true,
  auth: {
    user: "",
    pass: "",
  },
  fromName: "",
  fromEmail: "",
};

export default MailingConfig;
