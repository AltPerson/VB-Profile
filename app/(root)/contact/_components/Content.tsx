'use client';
import DefaultLayout from '@/components/default-layout';
import TypewriterText from '@/components/typewriter-text';
import { contactData } from '@/constants/portfolio-data';
import Image from 'next/image';
import Link from 'next/link';

const Content = () => {
  return (
    <DefaultLayout>
      <h3 className="greetings-title projects-greetings-title">
        <TypewriterText text={contactData['title']} />
      </h3>
      <ul className="after-typing flex flex-col gap-11">
        {contactData.contacts.map((contact, index) => (
          <li
            key={index}
            className="flex justify-between gap-4 items-center border-b-[1px] border-blueNeon pb-1"
            style={{
              opacity: 0,
              transform: 'translateX(100%)',
              animation: `slide-from-right 0.5s linear forwards 1 ${index * 0.12}s`,
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
