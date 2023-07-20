import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import facebook from 'public/assets/imgs/icons/facebook.svg';
import instagram from 'public/assets/imgs/icons/instagram.svg';
import linkedin from 'public/assets/imgs/icons/linkedin.svg';
import visa from 'public/assets/imgs/visa_master.png';
import iyzico from 'public/assets/imgs/iyzico.png';

const Footer = () => {
  return (
    <>
      <section className="py-20">
        <div className="container mx-auto mt-10 mb-8 w-full max-w-6xl bg-transparent px-5 text-center">
          <div className="my-auto mx-auto mt-20 px-5 text-gray-600 shadow-xl">
            <div className="mb-12 text-center">
              <h2
                className="font-heading wow animate__animated animate__fadeIn animated text-4xl font-bold"
                data-wow-delay=".1s"
              >
                İletişim
              </h2>
            </div>
            <div className="-mx-3 flex flex-wrap text-center">
              <div
                className="wow animate__animated animate__fadeIn animated mb-12 w-full px-3 lg:w-1/3"
                data-wow-delay=".5s"
              >
                <svg
                  className="mx-auto mb-6 h-8 w-8 text-lime-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                <div className="leading-relaxed">
                  <p>Kötekli Mah. Denizli Yolu Bulvarı No:4B/5 Menteşe/MUĞLA</p>
                </div>
              </div>

              <div
                className="wow animate__animated animate__fadeIn animated mb-12 w-full px-3 lg:w-1/3"
                data-wow-delay=".1s"
              >
                <svg
                  className="mx-auto mb-6 h-8 w-8 text-lime-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  ></path>
                </svg>
                <div className="leading-relaxed">
                  <p>+90 534 926 12 78</p>
                  <span className="text-blueGray-400 text-sm">
                    Pazartesi - Cumartesi , 09:30 - 18:00
                  </span>
                </div>
              </div>

              <div
                className="wow animate__animated animate__fadeIn animated mb-12 w-full px-3 lg:w-1/3"
                data-wow-delay=".3s"
              >
                <svg
                  className="mx-auto mb-6 h-8 w-8 text-lime-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
                <div className="leading-relaxed">
                  <p>destek@soilprime.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container mx-auto mb-10 mt-10 flex flex-wrap space-y-6 px-16 text-gray-600 md:flex-row md:space-y-0">
          <div className="flex w-full flex-col space-y-0 px-10 font-marck text-lg md:w-1/2">
            <p className="text-left">
              “Ne yazık ki, topraklar insan tarafından değil, doğa tarafından
              üretilir ve doğa ürünleri her zaman karmaşıktır... Çelik ve
              betondan toprağa geçer geçmez, teorinin hükümdarlığı sona erer.
              Doğal toprak asla tekdüze değildir. Özellikleri, noktadan noktaya
              değişirken, özellikleri hakkındaki bilgilerimiz, numunelerin
              toplandığı birkaç nokta ile sınırlıdır. Zemin mekaniğinde,
              hesaplanan sonuçların doğruluğu hiçbir zaman kaba bir tahminden
              fazlası olamaz ve teorinin temel işlevi, bize sahada neyi nasıl
              gözlemleyeceğimizi öğretmekten ibarettir.”
            </p>
            <p className="text-right">Karl Terzaghi</p>
          </div>

          <div className="flex flex-col space-y-12 px-12 md:w-1/2">
            <div className="flex flex-col space-y-5 text-left md:flex-row md:space-y-0 md:space-x-6">
              <div className="baseline rounded-lg md:bg-transparent">
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-semibold md:mb-4 md:hidden">
                    Kullanışlı Bağlantılar
                  </h3>
                </div>
              </div>
              <div>
                <h3 className="mb-6 hidden text-lg font-semibold md:block md:space-y-6">
                  Kullanışlı Bağlantılar
                </h3>
                <div className="-mx-3 -mb-6 flex flex-wrap">
                  <div className="mb-0 w-full px-3 md:w-1/2 lg:w-3/4">
                    <div className="px-6 pt-2 pb-6 text-left hover:text-lime-500">
                      <Link
                        className="mb-2 text-base font-medium"
                        href="/"
                      >
                        Ana Sayfa
                      </ Link>
                    </div>
                  </div>
                  <div className="mb-2 w-full px-3 md:w-1/2 lg:w-3/4">
                    <div className="px-6 pt-2 pb-6 text-left hover:text-lime-500">
                      <Link
                        className="mb-2 text-base font-medium"
                        href="/about-us"
                      >
                        Hakkımızda
                      </ Link>
                    </div>
                  </div>
                  <div className="mb-2 w-full px-3 md:w-1/2 lg:w-3/4">
                    <div className="px-6 pt-0 pb-6 text-left hover:text-lime-500">
                      <Link
                        className="mb-2 text-base font-medium"
                        href="/price-list"
                      >
                        Yazılımlarımız
                      </ Link>
                    </div>
                  </div>
                  <div className="mb-2 w-full px-3 md:w-1/2 lg:w-3/4">
                    <div className="px-6 pt-0 pb-6 text-left hover:text-lime-500">
                      <Link
                        className="mb-2 text-base font-medium" 
                        href="#"
                      >
                        Güncellemeler
                      </ Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-5 text-left md:flex-row md:space-y-0 md:space-x-6">
              <div className="baseline rounded-lg py-2 md:bg-transparent">
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-semibold md:mb-4 md:hidden">
                    Sosyal Medya Hesaplarımız
                  </h3>
                </div>
              </div>
              <div>
                <h3 className="mb-6 hidden text-lg font-semibold md:block md:space-y-6">
                  Sosyal Medya Hesaplarımız
                </h3>
                <div className="flex flex-row space-x-10 px-6 text-center">
                  <div
                    className="wow animate__animated animate__fadeIn animated mb-6 h-10 w-10 px-1"
                    data-wow-delay=".5s"
                  >
                    <Link 
                      href="https://www.facebook.com/SoilPrime_Tr-311269576437767/?modal=admin_todo_tour">
                      <Image
                        src={facebook}
                        width={448}
                        height={512}
                        className="text-sm leading-none"
                        alt="facebook Logo"
                      ></Image>
                    </ Link>
                  </div>
                  <div
                    className="wow animate__animated animate__fadeIn animated mb-6 h-10 w-10 px-1"
                    data-wow-delay=".5s text-blue-500"
                  >
                    <Link
                      href="https://www.instagram.com/soilprime_tr/?hl=tr">
                      <Image
                        src={instagram}
                        width={448}
                        height={512}
                        className="text-sm leading-none"
                        alt="instagram Logo"
                      ></Image>
                    </ Link>
                  </div>
                  <div
                    className="wow animate__animated animate__fadeIn animated mb-6 h-10 w-10 px-1"
                    data-wow-delay=".1s"
                  >
                    <Link
                      href="https://www.linkedin.com/company/soilprime/about/?viewAsMember=true">
                      <Image
                        src={linkedin}
                        width={448}
                        height={512}
                        className="text-sm leading-none"
                        alt="linkedin Logo"
                      ></Image>
                    </ Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-800 py-0 text-white">
        <div className="container mx-auto flex flex-col justify-between px-12">
          <div className="-mx-3 mb-2 flex flex-col text-center lg:mb-0">
            <div className="mb-2 w-full py-4 px-0 lg:mb-0">
              <ul className="justify-center lg:flex lg:w-auto lg:items-center lg:space-x-12">
                <li className="pt-4 pb-4">
                  <Link
                    prefetch={false}
                    href="https://drive.google.com/file/d/1IT6yV1AHsXxzZ366cgYtUp1VXp0oj3FO/view?usp=sharing"
                    className="text-blueGray-300 text-sm hover:text-white"
                  >
                    Gizlilik ve Çerez Politikası
                  </Link>
                </li>
                <li className="pt-4 pb-4">
                  <Link
                    prefetch={false}
                    href="https://drive.google.com/file/d/1fdOs5zona6sDcLD6Ow4HqMmE2_Snkacc/view?usp=sharing"
                    className="text-blueGray-300 text-sm hover:text-white"
                  >
                    Mesafeli Satış Sözleşmesi
                  </Link>
                </li>
                <li className="pt-4 pb-4">
                  <Link
                    prefetch={false}
                    href="https://drive.google.com/file/d/1FoC5GbsEoKdldlFTbs0Mk2__yBRnSoyN/view?usp=sharing"
                    className="text-blueGray-300 text-sm hover:text-white"
                  >
                    Üyelik Sözleşmesi
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <ul className="flex flex-row items-center justify-center space-x-4 lg:items-center lg:space-x-4">
                <li className="pt-5 pb-3">
                  <Image
                    src={visa}
                    width={85}
                    height={22}
                    className="text-xl font-semibold leading-none"
                    alt="visa Logo"
                  ></Image>
                </li>
                <li className="pt-5 pb-3">
                  <Image
                    src={iyzico}
                    width={96}
                    height={50}
                    className="text-xl font-semibold leading-none"
                    alt="iyzico Logo"
                  ></Image>
                </li>
                <li className="pt-4 pb-4">
                  <a className="text-blueGray-300 text-sm">©Copyright 2022</a>
                </li>
                <li className="pt-4 pb-4">
                  <Link
                    prefetch={false}
                    href="https://drive.google.com/file/d/1FoC5GbsEoKdldlFTbs0Mk2__yBRnSoyN/view?usp=sharing"
                    className="text-blueGray-300 text-sm hover:text-white"
                  >
                    SoilPrime
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
