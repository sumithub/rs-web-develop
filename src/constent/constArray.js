export const USER_ACTIONS = [
    { label: "Edit User", value: "edit" },
    { label: "Suspend/Reactivate", value: "suspend/reactivate" },
    { label: "Change Role", value: "role" },
    { label: "Change Password", value: "change-password" },
    { label: "Resend Invite", value: "resend-invite" },
    { label: "Remove User", value: "remove-user" },
    { label: "Send Invite", value: "send-invite" },
    { label: "Setup Password", value: "setup-password" },
]

export const users = [
    { name: "Jaydon George", role: "Manager", status: "Active", lastActive: "Aug 05,2024" },
    { name: "Jaydon George", role: "Manager", status: "Pending Invite", lastActive: "Aug 05,2024" },
    { name: "Jaydon George", role: "Manager", status: "Suspended", lastActive: "Aug 05,2024" },
    { name: "Jaydon George", role: "Manager", status: "Active", lastActive: "Aug 05,2024" },
];

export const TEMPLATE_ACTIONS = [
    { label: "Edit", value: "edit" },
    { label: "Preview", value: "preview" },
    { label: "Clone", value: "clone" },
]

export const templates = [
    { name: "Hiking template", type: "Email", subject: "Lorem ipsum....", lastUpdated: new Date('2024-06-18T10:00:00') },
    { name: "Hiking template", type: "SMS", subject: "Lorem ipsum....", lastUpdated: new Date('2024-06-18T10:00:00') },
    { name: "Hiking template", type: "Email", subject: "Lorem ipsum....", lastUpdated: new Date('2024-06-18T10:00:00') },
    { name: "Hiking template", type: "Email", subject: "Lorem ipsum....", lastUpdated: new Date('2024-06-18T10:00:00') },
];

export const manageCampaigns = [{ name: "Campaign 1", createdOn: "Jan 10, 2025", launchDate: "Jan 15, 2025", customerCount: 150, status: "Draft" },
{ name: "Campaign 2", createdOn: "Jan 10, 2025", launchDate: "Jan 15, 2025", customerCount: 150, status: "Draft" },
{ name: "Campaign 3", createdOn: "Jan 10, 2025", launchDate: "Jan 15, 2025", customerCount: 150, status: "Draft" },
{ name: "Campaign 4", createdOn: "Jan 10, 2025", launchDate: "Jan 15, 2025", customerCount: 150, status: "Draft" },
]

export const reviews = [{ img: "/images/google.svg", source: "Google", totalReviews: 500, lastDays: 300, thisMonth: 300, lastMonth: 123 },
{ img: "/images/yelp.svg", source: "Yelp", totalReviews: 200, lastDays: 70, thisMonth: 123, lastMonth: 123 },
{ img: "/images/owl.svg", source: "Tripadvisor", totalReviews: 150, lastDays: 35, thisMonth: 132, lastMonth: 123 },
]

export const responseInsights = [
    { id: "USR10000", date: new Date('2024-06-18T10:00:00'), actionToken: "opened", details: "review submit" },
    { id: "USR10000", date: new Date('2024-06-18T10:00:00'), actionToken: "opened", details: "review submit" },
    { id: "USR10000", date: new Date('2024-06-18T10:00:00'), actionToken: "opened", details: "review submit" },
]

export const customerList = [
    { name: "John Doe", email: "john@example.com", phone: +919876543210, tag: "at risk", source: "Manual", date: "Jun 18,2024" },

    { name: "John Doe", email: "john@example.com", phone: +919876543210, tag: "at risk", source: "Manual", date: "Jun 18,2024" },

    { name: "John Doe", email: "john@example.com", phone: +919876543210, tag: "at risk", source: "Manual", date: "Jun 18,2024" },

    { name: "John Doe", email: "john@example.com", phone: +919876543210, tag: "at risk", source: "Manual", date: "Jun 18,2024" },
]

export const emailTemplates = [
    { name: "Nature Template", description: "Lorem ipsum..", type: "Email Template" },
    { name: "Nature Template", description: "Lorem ipsum..", type: "Email Template" },
    { name: "Nature Template", description: "Lorem ipsum..", type: "Email Template" },
    { name: "Nature Template", description: "Lorem ipsum..", type: "Email Template" },
]
