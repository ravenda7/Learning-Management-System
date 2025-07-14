import CoursesCard from "@/components/courses/courses-card";

export default function Courses () {

    return (
        <div className="flex flex-col items-center p-4">
            <div className="container mx-auto flex flex-col gap-y-4 p-4">
                <div className="space-y-2 text-left">
                    <h1 className="text-xl font-bold">Explore Courses</h1>
                    <p className="text-gray-600 font-semibold text-sm">Discover our video range of courses designed to help you achieve your learning goals.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <CoursesCard
                        id={1}
                        title="Introduction to Web Development"
                        description="Learn the basics of web development, including HTML, CSS, and JavaScript."
                        thubmail="/test/thumbnail.jpg"
                        category="Web Development"
                    />
                     <CoursesCard
                        id={1}
                        title="Introduction to Web Development"
                        description="Learn the basics of web development, including HTML, CSS, and JavaScript."
                        thubmail="/test/thumbnail.jpg"
                        category="Web Development"
                    />
                     <CoursesCard
                        id={1}
                        title="Introduction to Web Development"
                        description="Learn the basics of web development, including HTML, CSS, and JavaScript."
                        thubmail="/test/thumbnail.jpg"
                        category="Web Development"
                    />
                     <CoursesCard
                        id={1}
                        title="Introduction to Web Development"
                        description="Learn the basics of web development, including HTML, CSS, and JavaScript."
                        thubmail="/test/thumbnail.jpg"
                        category="Web Development"
                    />
                     <CoursesCard
                        id={1}
                        title="Introduction to Web Development"
                        description="Learn the basics of web development, including HTML, CSS, and JavaScript."
                        thubmail="/test/thumbnail.jpg"
                        category="Web Development"
                    />
                     <CoursesCard
                        id={1}
                        title="Introduction to Web Development"
                        description="Learn the basics of web development, including HTML, CSS, and JavaScript."
                        thubmail="/test/thumbnail.jpg"
                        category="Web Development"
                    />
                     <CoursesCard
                        id={1}
                        title="Introduction to Web Development"
                        description="Learn the basics of web development, including HTML, CSS, and JavaScript."
                        thubmail="/test/thumbnail.jpg"
                        category="Web Development"
                    />
                     <CoursesCard
                        id={1}
                        title="Introduction to Web Development"
                        description="Learn the basics of web development, including HTML, CSS, and JavaScript."
                        thubmail="/test/thumbnail.jpg"
                        category="Web Development"
                    />
                     <CoursesCard
                        id={1}
                        title="Introduction to Web Development"
                        description="Learn the basics of web development, including HTML, CSS, and JavaScript."
                        thubmail="/test/thumbnail.jpg"
                        category="Web Development"
                    />
                     <CoursesCard
                        id={1}
                        title="Introduction to Web Development"
                        description="Learn the basics of web development, including HTML, CSS, and JavaScript."
                        thubmail="/test/thumbnail.jpg"
                        category="Web Development"
                    />
                     <CoursesCard
                        id={1}
                        title="Introduction to Web Development"
                        description="Learn the basics of web development, including HTML, CSS, and JavaScript."
                        thubmail="/test/thumbnail.jpg"
                        category="Web Development"
                    />
                </div>
            </div>
        </div>
    )
}