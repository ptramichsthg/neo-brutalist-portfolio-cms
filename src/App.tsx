import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Works from "./components/Works";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import ContactInfo from "./components/ContactInfo";
import Footer from "./components/Footer";
import AllProjects from "./components/AllProjects";
import AdminRoute from "./pages/admin";

export type ViewState = "home" | "projects" | "admin";

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(() => {
    if (window.location.pathname === '/admin') return "admin";
    return "home";
  });

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((el) => observer.observe(el));

    const handleResize = () => {
      revealElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          el.classList.add("active");
        }
      });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [view]);

  const handleNavigateToProjects = () => {
    setView("projects");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigateHome = (forceScrollTop = true) => {
    const wasInProjects = view === "projects";
    setView("home");

    if (forceScrollTop && (wasInProjects || window.scrollY > 100)) {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 50);
    }
  };

  // Check route
  if (view === "admin") {
    return <AdminRoute />;
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden selection:bg-yellow-300 bg-[#f0f0f0]" style={{ color: 'var(--text-primary)' }}>
      <Navbar onHomeClick={handleNavigateHome} currentView={view as "home" | "projects"} />
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-24 md:pt-32">
        <main className="space-y-24">
          {view === "home" ? (
            <>
              <Hero />

              <div id="work" className="reveal scroll-mt-32">
                <Works onViewAll={handleNavigateToProjects} />
              </div>

              <div id="services" className="reveal scroll-mt-32">
                <Services />
              </div>

              <div id="about" className="reveal scroll-mt-32">
                <About />
              </div>

              <div id="testi" className="reveal scroll-mt-32">
                <Testimonials />
              </div>

              <div id="contact-info" className="reveal scroll-mt-32">
                <ContactInfo />
              </div>
            </>
          ) : (
            <AllProjects onBack={() => handleNavigateHome(true)} />
          )}
        </main>
        <Footer onHomeClick={() => handleNavigateHome(true)} />
      </div>
    </div>
  );
};

export default App;
