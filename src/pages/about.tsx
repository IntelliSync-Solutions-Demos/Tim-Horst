export function About() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Intro Heading & Paragraph */}
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            About Tim Horst
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            With over four decades of experience in window installations and 
            home renovations, Tim Horst has built a reputation for excellence 
            in the Chatham-Kent area. Learn more about our story, our values, 
            and what drives us to deliver the best results for our clients.
          </p>
        </div>

        {/* Content Cards Grid */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:mt-20 lg:max-w-none lg:grid-cols-2">
          
          {/* 1: Our History */}
          <article className="flex flex-col items-start">
            <div className="relative w-full">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                alt="Home renovation project"
                className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[3/2]"
              />
            </div>
            <div className="max-w-xl">
              <div className="mt-8 flex items-center gap-x-4 text-xs">
                <time dateTime="1984" className="text-gray-500">
                  Est. 1984
                </time>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900">
                  Our History
                </h3>
                <p className="mt-5 text-sm leading-6 text-gray-600">
                  Starting as a small window installation business in 1984, Tim has 
                  grown his company through word-of-mouth recommendations and 
                  a commitment to quality craftsmanship. Today, we continue to serve 
                  the Chatham-Kent community with the same dedication to excellence 
                  that has defined our work for decades.
                </p>
              </div>
            </div>
          </article>

          {/* 2: Our Commitment */}
          <article className="flex flex-col items-start">
            <div className="relative w-full">
              <img
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80"
                alt="Window installation"
                className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[3/2]"
              />
            </div>
            <div className="max-w-xl">
              <div className="mt-8 flex items-center gap-x-4 text-xs">
                <time dateTime="2024" className="text-gray-500">
                  40+ Years Experience
                </time>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900">
                  Our Commitment
                </h3>
                <p className="mt-5 text-sm leading-6 text-gray-600">
                  We believe in doing things right the first time. Every project 
                  receives our full attention to detail, ensuring that your home 
                  improvements not only look beautiful but also stand the test of 
                  time. Our commitment to quality and customer satisfaction has made 
                  us a trusted name in home renovations.
                </p>
              </div>
            </div>
          </article>

          {/* 3: Family Values */}
          <article className="flex flex-col items-start">
            <div className="relative w-full">
              <img
                src="https://images.unsplash.com/photo-1605276378097-6f0157ad1452?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                alt="Family values"
                className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[3/2]"
              />
            </div>
            <div className="max-w-xl">
              <div className="mt-8 flex items-center gap-x-4 text-xs">
                <time dateTime="2024" className="text-gray-500">
                  Family-Owned
                </time>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900">
                  Our Family Values
                </h3>
                <p className="mt-5 text-sm leading-6 text-gray-600">
                  As a family-oriented business, we bring honesty and integrity 
                  into every customer interaction. We treat your home like our own, 
                  ensuring that each renovation project reflects the care and respect 
                  we’d want for our own families.
                </p>
              </div>
            </div>
          </article>

          {/* 4: Local Partnerships */}
          <article className="flex flex-col items-start">
            <div className="relative w-full">
              <img
                src="https://images.unsplash.com/photo-1596740909440-a07488afd3e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                alt="Local partnerships"
                className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[3/2]"
              />
            </div>
            <div className="max-w-xl">
              <div className="mt-8 flex items-center gap-x-4 text-xs">
                <time dateTime="2024" className="text-gray-500">
                  Community Ties
                </time>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900">
                  Local Partnerships
                </h3>
                <p className="mt-5 text-sm leading-6 text-gray-600">
                  We work with local suppliers and artisans to support the 
                  Chatham-Kent economy. By sourcing materials and services locally, 
                  we help build stronger community ties and ensure faster, 
                  more reliable project turnaround.
                </p>
              </div>
            </div>
          </article>

          {/* 5: Community Involvement */}
          <article className="flex flex-col items-start">
            <div className="relative w-full">
              <img
                src="https://images.unsplash.com/photo-1521737622937-3a5df91eb7eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                alt="Community involvement"
                className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[3/2]"
              />
            </div>
            <div className="max-w-xl">
              <div className="mt-8 flex items-center gap-x-4 text-xs">
                <time dateTime="2024" className="text-gray-500">
                  Giving Back
                </time>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900">
                  Community Involvement
                </h3>
                <p className="mt-5 text-sm leading-6 text-gray-600">
                  Tim believes in giving back to the community that has supported 
                  him for so many years. From sponsoring local events to volunteering 
                  for charitable causes, we’re dedicated to making a positive impact 
                  beyond home renovations.
                </p>
              </div>
            </div>
          </article>

          {/* 6: Professional Affiliations */}
          <article className="flex flex-col items-start">
            <div className="relative w-full">
              <img
                src="https://images.unsplash.com/photo-1612634697281-b15fd0fd9753?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80"
                alt="Professional affiliations"
                className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[3/2]"
              />
            </div>
            <div className="max-w-xl">
              <div className="mt-8 flex items-center gap-x-4 text-xs">
                <time dateTime="2024" className="text-gray-500">
                  Certified & Trusted
                </time>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900">
                  Professional Affiliations
                </h3>
                <p className="mt-5 text-sm leading-6 text-gray-600">
                  We’re proud to be affiliated with reputable trade organizations 
                  that uphold industry standards. These affiliations not only ensure 
                  we stay current on the latest renovation practices, but also give 
                  our clients peace of mind knowing they're hiring certified experts.
                </p>
              </div>
            </div>
          </article>

          {/* 7: Vision & Future */}
          <article className="flex flex-col items-start">
            <div className="relative w-full">
              <img
                src="https://images.unsplash.com/photo-1578564905496-1712a0b3e100?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80"
                alt="Future vision"
                className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[3/2]"
              />
            </div>
            <div className="max-w-xl">
              <div className="mt-8 flex items-center gap-x-4 text-xs">
                <time dateTime="2024" className="text-gray-500">
                  Looking Ahead
                </time>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900">
                  Our Vision for the Future
                </h3>
                <p className="mt-5 text-sm leading-6 text-gray-600">
                  We’re committed to continually improving our services, embracing 
                  new technologies, and adopting sustainable practices to protect 
                  the environment. Our vision is to remain the top choice for 
                  high-quality renovations while contributing to a vibrant, thriving 
                  Chatham-Kent community.
                </p>
              </div>
            </div>
          </article>

        </div>
      </div>
    </div>
  );
}