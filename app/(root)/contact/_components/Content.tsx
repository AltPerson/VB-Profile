'use client';
import DefaultLayout from '@/components/default-layout';
import { useChangeLanguage } from '@/contexts/language-context';
import { contactData } from '@/locales';
import Image from 'next/image';
import Link from 'next/link';

const Content = () => {
  const { language } = useChangeLanguage();
  return (
    <DefaultLayout>
      <h3 className="greetings-title projects-greetings-title">{contactData[language]['title']}</h3>
      <ul className="flex flex-col gap-11">
        {contactData[language].contacts.map((contact, index) => (
          <li
            key={index}
            className="flex justify-between gap-4 items-center border-b-[1px] border-blueNeon pb-1"
            style={{
              opacity: 0,
              transform: 'translateX(100%)',
              animation: `slide-from-right 1s linear forwards 1 ${
                index == 0 ? 0.5 : index / 2 + 0.5
              }s`,
            }}
          >
            <div className="flex-shrink">
              <Link
                href={contact.title === 'email' ? `mailto:${contact.link}` : contact.link}
                target="_blank"
                className="break-words hover-opacity"
                style={{
                  wordBreak: 'break-word',
                }}
              >
                <h5 className="font-rajdhani text-blueNeon text-3xl max-xl:text-2xl">{`<${contact.title} />`}</h5>
                <span className="font-rajdhani text-xl max-xl:text-base tracking-[6px] font-extralight inline-block break-words max-md:hidden">
                  {contact.link}
                </span>
              </Link>
            </div>
            <Image
              src={contact.img}
              alt="img"
              className="max-w-[21px] h-auto"
              style={{
                backgroundColor:
                  contact.title === 'linkedin' || contact.title === 'telegram' ? 'white' : '',
                borderRadius: '50%',
              }}
            />
          </li>
        ))}
      </ul>
    </DefaultLayout>
  );
};

export default Content;
