"use client";

import { Menu } from "@headlessui/react";
import classNames from "classnames";

interface BaseShareItemProps {
  link: string;
  active?: boolean;
}
interface ShareItemProps extends BaseShareItemProps {
  link: string;
  text: string;
  active?: boolean;
}

export default function ShareMenu({ url }: { url: string }) {
  const TEXT =
    "Oroko is a not-for-profit independent internet radio station based in Accra, Ghana.";

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="focus:outline-none">
          <div className="bg-white rounded-full px-4 lg:px-6 py-1.5 border-black border-2 font-semibold text-base md:text-lg lg:text-xl">
            Share
          </div>
        </Menu.Button>
      </div>

      <Menu.Items className="absolute right-2 mt-2 bg-black text-white focus:outline-none">
        <div className="pt-4 pb-4">
          <Menu.Item>
            {({ active }) => (
              <WhatsApp link={url} text={TEXT} active={active} />
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => <Facebook link={url} active={active} />}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => <Twitter link={url} text={TEXT} active={active} />}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Telegram link={url} text={TEXT} active={active} />
            )}
          </Menu.Item>
        </div>
      </Menu.Items>
    </Menu>
  );
}

const menuItemClasses = "block text-small font-medium py-2 px-6";

const WhatsApp = ({ link, text, active = false }: ShareItemProps) => (
  <a
    className={classNames(
      menuItemClasses,
      "hover:text-social-whatsapp",
      active ? "text-social-whatsapp" : "",
    )}
    target="_blank"
    rel="noopener nofollow noreferrer"
    href={`https://wa.me/?text=${encodeURI(`${text} ${link}`)}`}
  >
    WhatsApp
  </a>
);

const Facebook = ({ link, active = false }: BaseShareItemProps) => (
  <a
    className={classNames(
      menuItemClasses,
      "hover:text-social-facebook",
      active ? "text-social-facebook" : "",
    )}
    target="_blank"
    rel="noopener nofollow noreferrer"
    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURI(link)}`}
  >
    Facebook
  </a>
);

const Twitter = ({ link, text, active = false }: ShareItemProps) => (
  <a
    className={classNames(
      menuItemClasses,
      "hover:text-social-twitter",
      active ? "text-social-twitter" : "",
    )}
    target="_blank"
    rel="noopener nofollow noreferrer"
    href={`https://twitter.com/intent/tweet?text=${encodeURI(
      text,
    )}&url=${encodeURI(link)}&via=orokoradio`}
  >
    Twitter
  </a>
);

const Telegram = ({ link, text, active = false }: ShareItemProps) => (
  <a
    className={classNames(
      menuItemClasses,
      "hover:text-social-telegram",
      active ? "text-social-telegram" : "",
    )}
    target="_blank"
    rel="noopener nofollow noreferrer"
    href={`https://telegram.me/share/url?url=${encodeURI(
      link,
    )}&text=${encodeURI(text)}`}
  >
    Telegram
  </a>
);
