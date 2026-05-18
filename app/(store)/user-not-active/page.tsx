import { getTranslations } from "next-intl/server";

export default async function UserNotActivePage() {
  const t = await getTranslations('UserNotActive');
  
  return (
    <div className="flex items-center justify-center">
      <div className="rounded-lg max-w-lg text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">{t('title')}</h1>
        <h3 className="text-lg mb-6">{t('message')}</h3>
        {/*<a href="/" className="inline-block px-6 py-2 bg-gradient-to-b from-[#6fcfeb] to-[#9264cc] p-6 rounded-xl text-white hover:opacity-85 transition-all cursor-pointer">
          {t('button')}
        </a>*/}
      </div>
    </div>
  )
}