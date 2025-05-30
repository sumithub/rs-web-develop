export const USER_ACTIONS = [
    { label: "Edit User", value: "edit", icon: "/dropdown/edit.svg", hoverIcon: "/dropdown/edit-active.svg" },
    { label: "Suspend/Reactivate", value: "suspend/reactivate", icon: "/dropdown/pause.svg", hoverIcon: "/dropdown/pause-active.svg" },
    { label: "Change Role", value: "role", icon: "/dropdown/role.svg", hoverIcon: "/dropdown/role-active.svg" },
    { label: "Change Password", value: "change-password", icon: "/dropdown/key.svg", hoverIcon: "/dropdown/key-active.svg" },
    { label: "Resend Invite", value: "resend-invite", icon: "/dropdown/user.svg", hoverIcon: "/dropdown/user-active.svg" },
    { label: "Send Invite", value: "send-invite", icon: "/dropdown/user.svg", hoverIcon: "/dropdown/user-active.svg" },
    { label: "Setup Password", value: "setup-password", icon: "/dropdown/key.svg", hoverIcon: "/dropdown/key-active.svg" },
    { label: "Remove User", value: "remove-user", icon: "/dropdown/delete.svg", hoverIcon: "/dropdown/delete-active.svg" },
]

export const users = [
    { name: "Jaydon George", role: "Manager", status: "Active", lastActive: "Aug 05,2024" },
    { name: "Jaydon George", role: "Manager", status: "Pending Invite", lastActive: "Aug 05,2024" },
    { name: "Jaydon George", role: "Manager", status: "Suspended", lastActive: "Aug 05,2024" },
    { name: "Jaydon George", role: "Manager", status: "Active", lastActive: "Aug 05,2024" },
];

export const TEMPLATE_ACTIONS = [
    { label: "Edit", value: "edit", icon: "/dropdown/edit.svg", hoverIcon: "/dropdown/edit-active.svg" },
    { label: "Preview", value: "preview", icon: "/dropdown/eye.svg", hoverIcon: "/dropdown/eye-active.svg" },
    { label: "Clone", value: "clone", icon: "/dropdown/clone.svg", hoverIcon: "/dropdown/clone-active.svg" },
    { label: "Delete", value: "delete", icon: "/dropdown/delete.svg", hoverIcon: "/dropdown/delete-active.svg" },
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

export const emailTemplates = [
    { name: "Nature Template", description: "Lorem ipsum..", type: "Email Template" },
    { name: "Nature Template", description: "Lorem ipsum..", type: "Email Template" },
    { name: "Nature Template", description: "Lorem ipsum..", type: "Email Template" },
    { name: "Nature Template", description: "Lorem ipsum..", type: "Email Template" },
]

export const templateList = [
    { templateList: "Nature Template", description: "Lorem ipsum..", templateType: "Email Template" },
    { templateList: "Nature Template", description: "Lorem ipsum..", templateType: "Email Template" },
    { templateList: "Nature Template", description: "Lorem ipsum..", templateType: "Email Template" },
    { templateList: "Nature Template", description: "Lorem ipsum..", templateType: "Email Template" },
]

export const customerList = [
    { name: "John Doe", email: "john@example.com", phone: +919876543210, tag: "at risk", source: "Manual", date: "Jun 18,2024" },
    { name: "John Doe", email: "john@example.com", phone: +919876543210, tag: "at risk", source: "Manual", date: "Jun 18,2024" },
    { name: "John Doe", email: "john@example.com", phone: +919876543210, tag: "at risk", source: "Manual", date: "Jun 18,2024" },
    { name: "John Doe", email: "john@example.com", phone: +919876543210, tag: "at risk", source: "Manual", date: "Jun 18,2024" },
]

export const selectedCustomers = [
    { customerName: "John Doe", email: "john@example.com", phone: +919876543210 },
    { customerName: "John Doe", email: "john@example.com", phone: +919876543210 },
    { customerName: "John Doe", email: "john@example.com", phone: +919876543210 },
    { customerName: "John Doe", email: "john@example.com", phone: +919876543210 },
]

export const customerTagging = [
    { status: "At Risk", description: "Lorem ipsum dummy..", taggedCustomer: 150 },
    { status: "VIP", description: "Lorem ipsum dummy..", taggedCustomer: 150 },
    { status: "Priority", description: "Lorem ipsum dummy..", taggedCustomer: 150 },
    { status: "Dp", description: "Lorem ipsum dummy..", taggedCustomer: 150 },
]
