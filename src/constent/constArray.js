export const USER_ACTIONS = [
    { label: "Edit User", value: "edit", icon: "/dropdown/edit.svg", hoverIcon: "/dropdown/edit-active.svg" },
    { label: "Suspend/Reactivate", value: "suspend/reactivate", icon: "/dropdown/pause.svg", hoverIcon: "/dropdown/pause-active.svg" },
    { label: "Change Role", value: "role", icon: "/dropdown/role.svg", hoverIcon: "/dropdown/role-active.svg" },
    { label: "Change Password", value: "change-password", icon: "/dropdown/key.svg", hoverIcon: "/dropdown/key-active.svg" },
    { label: "Resend Invite", value: "resend-invite", icon: "/dropdown/user.svg", hoverIcon: "/dropdown/user-active.svg" },
    { label: "Remove User", value: "remove-user", icon: "/dropdown/delete.svg", hoverIcon: "/dropdown/delete-active.svg" },
]

export const users = [
    { name: "Jaydon George", img: "/images/request.png", role: "Manager", status: "Active", lastActive: "Aug 05,2024" },
    { name: "Jaydon George", img: "/images/request.png", role: "Manager", status: "Pending Invite", lastActive: "Aug 05,2024" },
    { name: "Jaydon George", img: "/images/request.png", role: "Manager", status: "Suspended", lastActive: "Aug 05,2024" },
    { name: "Jaydon George", img: "/images/request.png", role: "Manager", status: "Active", lastActive: "Aug 05,2024" },
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
    { name: "John Doe", email: "john@example.com", phone: +919876543210, status: "at risk", source: "Manual", date: "Jun 18,2024" },
    { name: "John Doe", email: "john@example.com", phone: +919876543210, status: "at risk", source: "Manual", date: "Jun 18,2024" },
    { name: "John Doe", email: "john@example.com", phone: +919876543210, status: "at risk", source: "Manual", date: "Jun 18,2024" },
    { name: "John Doe", email: "john@example.com", phone: +919876543210, status: "at risk", source: "Manual", date: "Jun 18,2024" },
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

export const manageReview = [
    { name: "Hiking template", review: "Great!", source: "Google", lastUpdate: new Date('2024-06-18T10:00:00'), status: "New" },

    { name: "Hiking template", review: "Great!", source: "Google", lastUpdate: new Date('2024-06-18T10:00:00'), status: "Responded" },

    { name: "Hiking template", review: "Great!", source: "Google", lastUpdate: new Date('2024-06-18T10:00:00'), status: "Flagged" },
]

export const REVIEW_ACTIONS = [
    { label: "Reply Now", value: "reply-now", icon: "/dropdown/sms.svg", hoverIcon: "/dropdown/sms-active.svg" },

    { label: "Request Update", value: "request-update", icon: "/dropdown/role.svg", hoverIcon: "/dropdown/role-active.svg" },

    { label: "Assign to User", value: "assign-to-user", icon: "/dropdown/user.svg", hoverIcon: "/dropdown/user-active.svg" },

    { label: "Share (Social Media, Email)", value: "share", icon: "/dropdown/share.svg", hoverIcon: "/dropdown/share-active.svg" },

    { label: "Delete", value: "delete", icon: "/dropdown/delete.svg", hoverIcon: "/dropdown/delete-active.svg" },
]

export const allCustomers = [
    { customerName: "John Doe", email: "john@example.com", phone: "+91 9876543210", status: "At Risk", source: "Manual", date: "Jun 18,2024" },

    { customerName: "John Doe", email: "john@example.com", phone: "+91 9876543210", status: "Vip", source: " CSV Import", date: "Jun 18,2024" },

    { customerName: "John Doe", email: "john@example.com", phone: "+91 9876543210", status: "Priority", source: "Manual", date: "Jun 18,2024" },

    { customerName: "John Doe", email: "john@example.com", phone: "+91 9876543210", status: "Dp", source: "CSV Import", date: "Jun 18,2024" },
]

export const customerHistory = [
    { listName: "January VIP Customers", createdOn: "Jun 18,2024", source: "CSV Import", taggedCustomers: 150 },

    { listName: "January VIP Customers", createdOn: "Jun 18,2024", source: "CSV Import", taggedCustomers: 150 },

    { listName: "January VIP Customers", createdOn: "Jun 18,2024", source: "CSV Import", taggedCustomers: 150 },

    { listName: "January VIP Customers", createdOn: "Jun 18,2024", source: "CSV Import", taggedCustomers: 150 },
]

export const fieldMapping = [
    { header: "Full Name", firstRow: "DELETE EXAMPLE - Elwyn" },
    { header: "Phone Number", firstRow: +919856958962 },
    { header: "Email", firstRow: "odavis@outlook.com" },
]

export const reviewResponse = [
    { templateName: "Positive Feedback", lastUpdate: "Jun 18,2024" },
    { templateName: "Positive Feedback", lastUpdate: "Jun 18,2024" },
    { templateName: "Positive Feedback", lastUpdate: "Jun 18,2024" },
    { templateName: "Positive Feedback", lastUpdate: "Jun 18,2024" },
]

export const notificationManagement = [
    { id: "NT-001", name: "Acme Corp", location: "NYC", medium: "Email", recipient: "User@example.com", message: "Welcome Email", status: "Sent", date: "Mar 03, 2024", },
    { id: "NT-001", name: "Acme Corp", location: "NYC", medium: "Email", recipient: "User@example.com", message: "Welcome Email", status: "Sent", date: "Mar 03, 2024", },
    { id: "NT-001", name: "Acme Corp", location: "NYC", medium: "Email", recipient: "User@example.com", message: "Welcome Email", status: "Sent", date: "Mar 03, 2024", },
    { id: "NT-001", name: "Acme Corp", location: "NYC", medium: "Email", recipient: "User@example.com", message: "Welcome Email", status: "Sent", date: "Mar 03, 2024", },
    { id: "NT-001", name: "Acme Corp", location: "NYC", medium: "Email", recipient: "User@example.com", message: "Welcome Email", status: "Sent", date: "Mar 03, 2024", },
    { id: "NT-001", name: "Acme Corp", location: "NYC", medium: "Email", recipient: "User@example.com", message: "Welcome Email", status: "Sent", date: "Mar 03, 2024", },
    { id: "NT-001", name: "Acme Corp", location: "NYC", medium: "Email", recipient: "User@example.com", message: "Welcome Email", status: "Sent", date: "Mar 03, 2024", },
    { id: "NT-001", name: "Acme Corp", location: "NYC", medium: "Email", recipient: "User@example.com", message: "Welcome Email", status: "Sent", date: "Mar 03, 2024", },
    { id: "NT-001", name: "Acme Corp", location: "NYC", medium: "Email", recipient: "User@example.com", message: "Welcome Email", status: "Sent", date: "Mar 03, 2024", },
]

export const auditLogsDashboard = [
    { id: "AL-001", subscription: "SUB-101", action: "File Uploaded", details: "John uploaded CSV file 'reviews.csv", performed: "john doe", timestamp: "Jun 18,2024 | 10:00AM", },
    { id: "AL-002", subscription: "SUB-102", action: "Customer Created", details: "Jane created new customer 'Acme Inc.", performed: "jane admin", timestamp: "Aug 18,2024 | 10:00AM", },
    { id: "AL-003", subscription: "SUB-103", action: "SMS Updated", details: "John updated SMS notifications from Off to On", performed: "john doe", timestamp: "Aug 18,2024 | 10:00AM", },
    { id: "AL-004", subscription: "SUB-104", action: "E-mail Uploaded", details: "Sarah changed the email template for review alerts", performed: "sarah admin", timestamp: "Jun 18,2024 | 10:00AM", },
    { id: "AL-005", subscription: "SUB-105", action: "File Uploaded", details: "John uploaded CSV file 'reviews.csv", performed: "john doe", timestamp: "Aug 18,2024 | 10:00AM", },
    { id: "AL-006", subscription: "SUB-106", action: "Customer updated", details: "Jane created new customer 'Acme Inc.", performed: "jane admin", timestamp: "Aug 18,2024 | 10:00AM", },
    { id: "AL-007", subscription: "SUB-107", action: "SMS Updated", details: "John updated SMS notifications from Off to On", performed: "john doe", timestamp: "Aug 18,2024 | 10:00AM", },
    { id: "AL-008", subscription: "SUB-108", action: "E-mail Uploaded", details: "Sarah changed the email template for review alerts", performed: "sarah admin", timestamp: "Aug 18,2024 | 10:00AM", },
    { id: "AL-008", subscription: "SUB-108", action: "E-mail Uploaded", details: "Sarah changed the email template for review alerts", performed: "sarah admin", timestamp: "Aug 18,2024 | 10:00AM", },
    { id: "AL-008", subscription: "SUB-108", action: "E-mail Uploaded", details: "Sarah changed the email template for review alerts", performed: "sarah admin", timestamp: "Aug 18,2024 | 10:00AM", },
]