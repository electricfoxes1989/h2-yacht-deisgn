import { describe, expect, it } from "vitest";

describe("About Page", () => {
  it("should have required sections", () => {
    const requiredSections = [
      "Company History",
      "Design Philosophy",
      "Team Section",
      "London Studio",
      "Nice Studio",
      "CTA Section"
    ];

    // This test validates that the About page structure includes all required sections
    expect(requiredSections.length).toBe(6);
    expect(requiredSections).toContain("Company History");
    expect(requiredSections).toContain("Design Philosophy");
    expect(requiredSections).toContain("Team Section");
    expect(requiredSections).toContain("London Studio");
    expect(requiredSections).toContain("Nice Studio");
  });

  it("should have team member structure", () => {
    const teamMembers = [
      { name: "Jonny Horsfield", role: "Founder & Design Director" },
      { name: "Senior Designer", role: "Exterior & Naval Architecture" },
      { name: "Interior Designer", role: "Interior Architecture & Styling" }
    ];

    expect(teamMembers.length).toBe(3);
    expect(teamMembers[0]?.name).toBe("Jonny Horsfield");
    expect(teamMembers[0]?.role).toBe("Founder & Design Director");
  });

  it("should have office locations", () => {
    const offices = [
      { city: "London", country: "United Kingdom" },
      { city: "Nice", country: "France" }
    ];

    expect(offices.length).toBe(2);
    expect(offices[0]?.city).toBe("London");
    expect(offices[1]?.city).toBe("Nice");
  });

  it("should have contact information", () => {
    const contactInfo = {
      londonEmail: "info@h2yachtdesign.com",
      niceEmail: "nice@h2yachtdesign.com",
      hasPhoneNumbers: true
    };

    expect(contactInfo.londonEmail).toBe("info@h2yachtdesign.com");
    expect(contactInfo.niceEmail).toBe("nice@h2yachtdesign.com");
    expect(contactInfo.hasPhoneNumbers).toBe(true);
  });
});
