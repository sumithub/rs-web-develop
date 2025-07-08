
export const USER_ACTIONS = [
    { label: "Edit User", value: "edit", icon: "/dropdown/edit.svg", hoverIcon: "/dropdown/edit-active.svg" },
    { label: "Suspend/Reactivate", value: "suspend/reactivate", icon: "/dropdown/pause.svg", hoverIcon: "/dropdown/pause-active.svg" },
    { label: "Change Role", value: "role", icon: "/dropdown/role.svg", hoverIcon: "/dropdown/role-active.svg" },
    { label: "Change Password", value: "change-password", icon: "/dropdown/key.svg", hoverIcon: "/dropdown/key-active.svg" },
    { label: "Resend Invite", value: "resend-invite", icon: "/dropdown/user.svg", hoverIcon: "/dropdown/user-active.svg" },
    { label: "Remove User", value: "remove-user", icon: "/dropdown/delete.svg", hoverIcon: "/dropdown/delete-active.svg" },
]

export const users = [
    { name: "Jaydon George", id: 1, email: "johan@example.com", img: "/images/request.png", role: "Manager", status: "Active", lastActive: "Aug 05,2024" },
    { name: "Jaydon George", id: 2, email: "johan@example.com", img: "/images/request.png", role: "Manager", status: "Pending Invite", lastActive: "Aug 05,2024" },
    { name: "Jaydon George", id: 3, email: "johan@example.com", img: "/images/request.png", role: "Manager", status: "Suspended", lastActive: "Aug 05,2024" },
    { name: "Jaydon George", id: 4, email: "johan@example.com", img: "/images/request.png", role: "Manager", status: "Active", lastActive: "Aug 05,2024" },
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

export const changeUsersRole = [
    { name: "Jaylon Torff", status: "Active", role: "Manager" },
    { name: "Mia Wong", status: "Active", role: "Viewer" },
    { name: "Liam Smith", status: "Active", role: "Owner" },
    { name: "Emma Johnson", status: "Active", role: "Manager" },

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
export const adminCustomerHistory = [
    { listName: "January VIP Customers", createdOn: "Jun 18,2024", client: "ABC Garage", totalCustomers: 150 },

    { listName: "January VIP Customers", createdOn: "Jun 18,2024", client: "ABC Garage", totalCustomers: 150 },

    { listName: "January VIP Customers", createdOn: "Jun 18,2024", client: "ABC Garage", totalCustomers: 150 },

    { listName: "January VIP Customers", createdOn: "Jun 18,2024", client: "ABC Garage", totalCustomers: 150 },
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


export const clientRules = [
    { id: "CR-001", name: "Acme Corp", location: "NYC", type: "New_review", condition: "Rating <3", action: "Notify", status: "inactive", date: "Mar 03, 2024", },
    { id: "CR-001", name: "Acme Corp", location: "NYC", type: "New_review", condition: "Rating <3", action: "Alert", status: "Active", date: "Mar 03, 2024", },
    { id: "CR-001", name: "Acme Corp", location: "NYC", type: "New_review", condition: "Rating <3", action: "Notify", status: "Active", date: "Mar 03, 2024", },
    { id: "CR-001", name: "Acme Corp", location: "NYC", type: "New_review", condition: "Rating <3", action: "Notify", status: "inactive", date: "Mar 03, 2024", },
    { id: "CR-001", name: "Acme Corp", location: "NYC", type: "New_review", condition: "Rating <3", action: "Notify", status: "Active", date: "Mar 03, 2024", },
    { id: "CR-001", name: "Acme Corp", location: "NYC", type: "New_review", condition: "Rating <3", action: "Alert", status: "Active", date: "Mar 03, 2024", },
    { id: "CR-001", name: "Acme Corp", location: "NYC", type: "New_review", condition: "Rating <3", action: "Notify", status: "inactive", date: "Mar 03, 2024", },
    { id: "CR-001", name: "Acme Corp", location: "NYC", type: "New_review", condition: "Rating <3", action: "Notify", status: "Active", date: "Mar 03, 2024", },
    { id: "CR-001", name: "Acme Corp", location: "NYC", type: "New_review", condition: "Rating <3", action: "Notify", status: "Active", date: "Mar 03, 2024", },
]

export const notificationPreferences = [
    { id: "NP-001", name: "Acme Corp", location: "Global", type: "Email", enabled: "yes", date: "Mar 03, 2024", },
    { id: "NP-001", name: "Acme Corp", location: "Global", type: "Email", enabled: "yes", date: "Mar 03, 2024", },
    { id: "NP-001", name: "Acme Corp", location: "Global", type: "Email", enabled: "No", date: "Mar 03, 2024", },
    { id: "NP-001", name: "Acme Corp", location: "Global", type: "Email", enabled: "Yes", date: "Mar 03, 2024", },
    { id: "NP-001", name: "Acme Corp", location: "Global", type: "Email", enabled: "Yes", date: "Mar 03, 2024", },
    { id: "NP-001", name: "Acme Corp", location: "Global", type: "Email", enabled: "Yes", date: "Mar 03, 2024", },
    { id: "NP-001", name: "Acme Corp", location: "Global", type: "Email", enabled: "No", date: "Mar 03, 2024", },
    { id: "NP-001", name: "Acme Corp", location: "Global", type: "Email", enabled: "Yes", date: "Mar 03, 2024", },
    { id: "NP-001", name: "Acme Corp", location: "Global", type: "Email", enabled: "Yes", date: "Mar 03, 2024", },
]

export const alertsManagement = [
    { id: "AL-001", name: "Acme Corp", location: "NYC", type: "New Review", message: "Low Rating Alert", status: "New", date: "Mar 03, 2024" },
    { id: "AL-001", name: "Acme Corp", location: "NYC", type: "New Review", message: "Low Rating Alert", status: "New", date: "Mar 03, 2024" },
    { id: "AL-001", name: "Acme Corp", location: "NYC", type: "New Review", message: "Low Rating Alert", status: "Read", date: "Mar 03, 2024" },
    { id: "AL-001", name: "Acme Corp", location: "NYC", type: "New Review", message: "Low Rating Alert", status: "New", date: "Mar 03, 2024" },
    { id: "AL-001", name: "Acme Corp", location: "NYC", type: "New Review", message: "Low Rating Alert", status: "New", date: "Mar 03, 2024" },
    { id: "AL-001", name: "Acme Corp", location: "NYC", type: "New Review", message: "Low Rating Alert", status: "New", date: "Mar 03, 2024" },
    { id: "AL-001", name: "Acme Corp", location: "NYC", type: "New Review", message: "Low Rating Alert", status: "Read", date: "Mar 03, 2024" },
    { id: "AL-001", name: "Acme Corp", location: "NYC", type: "New Review", message: "Low Rating Alert", status: "New", date: "Mar 03, 2024" },
    { id: "AL-001", name: "Acme Corp", location: "NYC", type: "New Review", message: "Low Rating Alert", status: "New", date: "Mar 03, 2024" },
]

export const auditLogs = [
    { id: "AL-001", subscription: "SUB-101", action: "File Uploaded", details: "John uploaded CSV file 'reviews.csv", performed: "john doe", timestamp: new Date('2024-06-18T10:00:00'), },
    { id: "AL-002", subscription: "SUB-102", action: "Customer Created", details: "Jane created new customer 'Acme Inc.", performed: "jane admin", timestamp: new Date('2024-06-18T10:00:00'), },
    { id: "AL-003", subscription: "SUB-103", action: "SMS Updated", details: "John updated SMS notifications from Off to On", performed: "john doe", timestamp: new Date('2024-06-18T10:00:00'), },
    { id: "AL-004", subscription: "SUB-104", action: "E-mail Uploaded", details: "Sarah changed the email template for review alerts", performed: "sarah admin", timestamp: new Date('2024-06-18T10:00:00') },
    { id: "AL-005", subscription: "SUB-105", action: "File Uploaded", details: "John uploaded CSV file 'reviews.csv", performed: "john doe", timestamp: new Date('2024-06-18T10:00:00'), },
    { id: "AL-006", subscription: "SUB-106", action: "Customer updated", details: "Jane created new customer 'Acme Inc.", performed: "jane admin", timestamp: new Date('2024-06-18T10:00:00'), },
    { id: "AL-007", subscription: "SUB-107", action: "SMS Updated", details: "John updated SMS notifications from Off to On", performed: "john doe", timestamp: new Date('2024-06-18T10:00:00'), },
    { id: "AL-008", subscription: "SUB-108", action: "E-mail Uploaded", details: "Sarah changed the email template for review alerts", performed: "sarah admin", timestamp: new Date('2024-06-18T10:00:00'), },
    { id: "AL-008", subscription: "SUB-108", action: "E-mail Uploaded", details: "Sarah changed the email template for review alerts", performed: "sarah admin", timestamp: new Date('2024-06-18T10:00:00'), },
    { id: "AL-008", subscription: "SUB-108", action: "E-mail Uploaded", details: "Sarah changed the email template for review alerts", performed: "sarah admin", timestamp: new Date('2024-06-18T10:00:00'), },
]

export const locationScreen = [
    { name: "John Deo", address: "123 Main St.", city: "NYC", state: "NY", country: "USA", phoneNumber: "555-1234" },
    { name: "John Deo", address: "123 Main St.", city: "NYC", state: "NY", country: "USA", phoneNumber: "555-1234" },
    { name: "John Deo", address: "123 Main St.", city: "NYC", state: "NY", country: "USA", phoneNumber: "555-1234" },
    { name: "John Deo", address: "123 Main St.", city: "NYC", state: "NY", country: "USA", phoneNumber: "555-1234" },
    { name: "John Deo", address: "123 Main St.", city: "NYC", state: "NY", country: "USA", phoneNumber: "555-1234" },
    { name: "John Deo", address: "123 Main St.", city: "NYC", state: "NY", country: "USA", phoneNumber: "555-1234" },
    { name: "John Deo", address: "123 Main St.", city: "NYC", state: "NY", country: "USA", phoneNumber: "555-1234" },
    { name: "John Deo", address: "123 Main St.", city: "NYC", state: "NY", country: "USA", phoneNumber: "555-1234" },
    { name: "John Deo", address: "123 Main St.", city: "NYC", state: "NY", country: "USA", phoneNumber: "555-1234" },
]

export const manageTags = [
    { name: "VIP", description: "High-value customers", customers: "120", created: "Client A" },
    { name: "Negative", description: "Customers with issues", customers: "45", created: "Client A" },
    { name: "Needs Follow-up", description: "Pending response", customers: "30", created: "Client B" },
    { name: "VIP", description: "High-value customers", customers: "50", created: "Client C" },
    { name: "Negative", description: "Customers with issues", customers: "30", created: "Client D" },
    { name: "Needs Follow-up", description: "Pending response", customers: "100", created: "Client E" },
    { name: "Needs Follow-up", description: "Pending response", customers: "100", created: "Client E" },
    { name: "VIP", description: "High-value customers", customers: "140", created: "Client F" },
    { name: "Negative", description: "Customers with issues", customers: "20", created: "Client F" },

]

export const locationReviews = [
    { customer: "John Deo", ratings: ["/images/star.svg", "/images/star.svg", "/images/star.svg", "/images/star.svg", "/images/rating-star.svg",], review: "Excellent service!", date: "10 Mar 2025", status: "Replied" },
    { customer: "Gustavo Torff", ratings: ["/images/star.svg", "/images/star.svg", "/images/star.svg", "/images/rating-star.svg", "/images/rating-star.svg",], review: "Wait time was long.", date: "11 Mar 2025", status: "Replied" },
    { customer: "John Deo", ratings: ["/images/star.svg", "/images/star.svg", "/images/rating-star.svg", "/images/rating-star.svg", "/images/rating-star.svg",], review: "Excellent service!", date: "10 Mar 2025", status: "Pending" },
    { customer: "John Deo", ratings: ["/images/star.svg", "/images/star.svg", "/images/star.svg", "/images/rating-star.svg", "/images/rating-star.svg",], review: "Excellent service!", date: "10 Mar 2025", status: "Replied" },
    { customer: "John Deo", ratings: ["/images/star.svg", "/images/star.svg", "/images/star.svg", "/images/rating-star.svg", "/images/rating-star.svg",], review: "Excellent service!", date: "10 Mar 2025", status: "Replied" },
    { customer: "John Deo", ratings: ["/images/star.svg", "/images/star.svg", "/images/star.svg", "/images/rating-star.svg", "/images/rating-star.svg",], review: "Excellent service!", date: "10 Mar 2025", status: "Replied" },
    { customer: "John Deo", ratings: ["/images/star.svg", "/images/star.svg", "/images/rating-star.svg", "/images/rating-star.svg", "/images/rating-star.svg",], review: "Excellent service!", date: "10 Mar 2025", status: "Replied" },
]

export const locationCampaign = [
    { name: "John Deo", status: "Active", responses: "150" },
    { name: "John Deo", status: "Active", responses: "150" },
    { name: "John Deo", status: "Completed", responses: "150" },
    { name: "John Deo", status: "Active", responses: "150" },
    { name: "John Deo", status: "Active", responses: "150" },
    { name: "John Deo", status: "Completed", responses: "150" },
]


export const clientCampaign = [
    { name: "John Deo", status: "Active", locations: "3 Locations", responses: "150" },
    { name: "John Deo", status: "Active", locations: "3 Locations", responses: "150" },
    { name: "John Deo", status: "Completed", locations: "3 Locations", responses: "150" },
    { name: "John Deo", status: "Active", locations: "3 Locations", responses: "150" },
    { name: "John Deo", status: "Active", locations: "3 Locations", responses: "150" },
    { name: "John Deo", status: "Completed", locations: "3 Locations", responses: "150" },
]


export const clientLocation = [
    { name: "Melbourne CBD", address: "123 Bourke St, Melbourne", reviews: "1200", rating: "4.5" },
    { name: "Melbourne CBD", address: "123 Bourke St, Melbourne", reviews: "1200", rating: "4.5" },
    { name: "Melbourne CBD", address: "123 Bourke St, Melbourne", reviews: "1200", rating: "4.5" },
    { name: "Melbourne CBD", address: "123 Bourke St, Melbourne", reviews: "1200", rating: "4.5" },
    { name: "Melbourne CBD", address: "123 Bourke St, Melbourne", reviews: "1200", rating: "4.5" },
    { name: "Melbourne CBD", address: "123 Bourke St, Melbourne", reviews: "1200", rating: "4.5" },
    { name: "Melbourne CBD", address: "123 Bourke St, Melbourne", reviews: "1200", rating: "4.5" },
]


export const clientSubscription = [
    { id: "INV-001", date: "Feb 01, 2025", amount: "$99.00", status: "Paid" },
    { id: "INV-001", date: "Feb 01, 2025", amount: "$99.00", status: "Paid" },
    { id: "INV-001", date: "Feb 01, 2025", amount: "$99.00", status: "Paid" },
    { id: "INV-001", date: "Feb 01, 2025", amount: "$99.00", status: "Overdue" },
    { id: "INV-001", date: "Feb 01, 2025", amount: "$99.00", status: "Paid" },
    { id: "INV-001", date: "Feb 01, 2025", amount: "$99.00", status: "Paid" },
    { id: "INV-001", date: "Feb 01, 2025", amount: "$99.00", status: "Overdue" },
    { id: "INV-001", date: "Feb 01, 2025", amount: "$99.00", status: "Paid" },
    { id: "INV-001", date: "Feb 01, 2025", amount: "$99.00", status: "Paid" },
    { id: "INV-001", date: "Feb 01, 2025", amount: "$99.00", status: "Overdue" },
]

export const userManagement = [
    { name: "Jaydon George", email: "JaydonGeorge@gmail.com", role: "Manager", client: "Xyz...", status: "activate" },
    { name: "Jaydon George", email: "JaydonGeorge@gmail.com", role: "Manager", client: "Xyz...", status: "activate" },
    { name: "Jaydon George", email: "JaydonGeorge@gmail.com", role: "Manager", client: "Xyz...", status: "activate" },
    { name: "Jaydon George", email: "JaydonGeorge@gmail.com", role: "Manager", client: "Xyz...", status: "activate" },
    { name: "Jaydon George", email: "JaydonGeorge@gmail.com", role: "Manager", client: "Xyz...", status: "activate" },
    { name: "Jaydon George", email: "JaydonGeorge@gmail.com", role: "Manager", client: "Xyz...", status: "activate" },
    { name: "Jaydon George", email: "JaydonGeorge@gmail.com", role: "Manager", client: "Xyz...", status: "activate" },
    { name: "Jaydon George", email: "JaydonGeorge@gmail.com", role: "Manager", client: "Xyz...", status: "activate" },
    { name: "Jaydon George", email: "JaydonGeorge@gmail.com", role: "Manager", client: "Xyz...", status: "activate" },
    { name: "Jaydon George", email: "JaydonGeorge@gmail.com", role: "Manager", client: "Xyz...", status: "activate" },
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

export const subscriptionSummary = [
    { feature: "Review Requests	", used: "3, 200", limit: "5,000" },
    { feature: "Email Invitations	", used: 150, limit: 200 },
    { feature: "SMS Invitations	", used: 90, limit: 100 },
]

export const paymentInvoice = [
    { invoiceNumber: "CM2233445", planName: "Growth Plan", amount: "$70", date: "Jan 25, 2025", status: "Paid" },
    { invoiceNumber: "CM2233445", planName: "Growth Plan", amount: "$70", date: "Jan 25, 2025", status: "Paid" },
    { invoiceNumber: "CM2233445", planName: "Growth Plan", amount: "$70", date: "Jan 25, 2025", status: "Overdue" },
    { invoiceNumber: "CM2233445", planName: "Growth Plan", amount: "$70", date: "Jan 25, 2025", status: "Overdue" },
    { invoiceNumber: "CM2233445", planName: "Growth Plan", amount: "$70", date: "Jan 25, 2025", status: "Paid" },
]

export const adminTemplates = [

    { name: "Nature Template", type: "Email", subject: "Welcome to Our Service", lastUpdate: "Mar 22,2024" },
    { name: "Nature Template", type: "SMS", subject: "Welcome to Our Service", lastUpdate: "Mar 22,2024" },
    { name: "Nature Template", type: "Email", subject: "Welcome to Our Service", lastUpdate: "Mar 22,2024" },
    { name: "Nature Template", type: "Email", subject: "Welcome to Our Service", lastUpdate: "Mar 22,2024" },
    { name: "Nature Template", type: "SMS", subject: "Welcome to Our Service", lastUpdate: "Mar 22,2024" },
    { name: "Nature Template", type: "Email", subject: "Welcome to Our Service", lastUpdate: "Mar 22,2024" },
    { name: "Nature Template", type: "SMS", subject: "Welcome to Our Service", lastUpdate: "Mar 22,2024" },
    { name: "Nature Template", type: "Email", subject: "Welcome to Our Service", lastUpdate: "Mar 22,2024" },
    { name: "Nature Template", type: "Email", subject: "Welcome to Our Service", lastUpdate: "Mar 22,2024" },
    { name: "Nature Template", type: "SMS", subject: "Welcome to Our Service", lastUpdate: "Mar 22,2024" },
]
export const clientsManagement = [
    { name: "John Doe", industry: "Construction", plan: "Professional Plan", status: "Active" },
    { name: "John Doe", industry: "Construction", plan: "Professional Plan", status: "Suspend" },
    { name: "John Doe", industry: "Construction", plan: "Professional Plan", status: "Active" },
    { name: "John Doe", industry: "Construction", plan: "Professional Plan", status: "Active" },
    { name: "John Doe", industry: "Construction", plan: "Professional Plan", status: "Active" },
    { name: "John Doe", industry: "Construction", plan: "Professional Plan", status: "Suspend" },
    { name: "John Doe", industry: "Construction", plan: "Professional Plan", status: "Active" },
    { name: "John Doe", industry: "Construction", plan: "Professional Plan", status: "Active" },
    { name: "John Doe", industry: "Construction", plan: "Professional Plan", status: "Active" },
]

export const locationsManagement = [
    { name: "Location-1", address: "123 Main St.", client: "Xyz..", count: "50" },
    { name: "Location-2", address: "123 Main St.", client: "Xyz..", count: "100" },
    { name: "Location-3", address: "123 Main St.", client: "Xyz..", count: "30" },
    { name: "Location-4", address: "123 Main St.", client: "Xyz..", count: "35" },
    { name: "Location-5", address: "123 Main St.", client: "Xyz..", count: "50" },
    { name: "Location-6", address: "123 Main St.", client: "Xyz..", count: "20" },
    { name: "Location-7", address: "123 Main St.", client: "Xyz..", count: "80" },
    { name: "Location-8", address: "123 Main St.", client: "Xyz..", count: "100" },
    { name: "Location-9", address: "123 Main St.", client: "Xyz..", count: "50" },
    { name: "Location-10", address: "123 Main St.", client: "Xyz..", count: "30" },
]

export const usersManagement = [
    { name: "Jaydon George", email: "JaydonGeorge@gmail.com", role: "Manager", assignedClient: "Xyz...", status: "Activate" },
    { name: "Jaydon George", email: "JaydonGeorge@gmail.com", role: "Manager", assignedClient: "Xyz...", status: "Activate" },
    { name: "Jaydon George", email: "JaydonGeorge@gmail.com", role: "Manager", assignedClient: "Xyz...", status: "Activate" },
    { name: "Jaydon George", email: "JaydonGeorge@gmail.com", role: "Manager", assignedClient: "Xyz...", status: "Activate" },
    { name: "Jaydon George", email: "JaydonGeorge@gmail.com", role: "Manager", assignedClient: "Xyz...", status: "Activate" },
    { name: "Jaydon George", email: "JaydonGeorge@gmail.com", role: "Manager", assignedClient: "Xyz...", status: "Activate" },
    { name: "Jaydon George", email: "JaydonGeorge@gmail.com", role: "Manager", assignedClient: "Xyz...", status: "Activate" },
]

export const rolesPermissions = [
    { name: "Admin", description: "Lorem Ipsum is simply", permissions: "Modify" },
    { name: "Owner", description: "Lorem Ipsum is simply", permissions: "Modify" },
    { name: "Manager", description: "Lorem Ipsum is simply", permissions: "Modify" },
    { name: "Guest", description: "Lorem Ipsum is simply", permissions: "Modify" },
    { name: "Admin", description: "Lorem Ipsum is simply", permissions: "Modify" },
    { name: "Owner", description: "Lorem Ipsum is simply", permissions: "Modify" },
    { name: "Manager", description: "Lorem Ipsum is simply", permissions: "Modify" },
    { name: "Guest", description: "Lorem Ipsum is simply", permissions: "Modify" },
]

export const latestReviews = [
    {
        ratings: ["/images/star.svg", "/images/star.svg", "/images/star.svg", "/images/star.svg", "/images/star.svg",]
        , review: "Great service!", reviewer: "John Doe", client: "Jaydon Saris"
    },

    {
        ratings: ["/images/star.svg", "/images/star.svg", "/images/star.svg", "/images/star.svg", "/images/star.svg",]
        , review: "Great service!", reviewer: "John Doe", client: "Jaydon Saris"
    },

    {
        ratings: ["/images/star.svg", "/images/star.svg", "/images/star.svg", "/images/star.svg", "/images/star.svg",]
        , review: "Great service!", reviewer: "John Doe", client: "Jaydon Saris"
    },

    {
        ratings: ["/images/star.svg", "/images/star.svg", "/images/star.svg", "/images/star.svg", "/images/star.svg",]
        , review: "Great service!", reviewer: "John Doe", client: "Jaydon Saris"
    },

    {
        ratings: ["/images/star.svg", "/images/star.svg", "/images/star.svg", "/images/star.svg", "/images/star.svg",]
        , review: "Great service!", reviewer: "John Doe", client: "Jaydon Saris"
    },
]

export const recentPayments = [
    { invoiceNumber: "Invoice #12345", amount: "$199.99", status: "paid", client: "Jaydon Saris" },
    { invoiceNumber: "Invoice #12345", amount: "$199.99", status: "paid", client: "Jaydon Saris" },
    { invoiceNumber: "Invoice #12345", amount: "$199.99", status: "paid", client: "Jaydon Saris" },
    { invoiceNumber: "Invoice #12345", amount: "$199.99", status: "paid", client: "Jaydon Saris" },
    { invoiceNumber: "Invoice #12345", amount: "$199.99", status: "paid", client: "Jaydon Saris" },
]

export const latestCampaigns = [
    { name: "Client A", client: "Jaydon Saris", status: "Active" },
    { name: "Client B", client: "Jaydon Saris", status: "Paused" },
    { name: "Client C", client: "Jaydon Saris", status: "Draft" },
    { name: "Client D", client: "Jaydon Saris", status: "Paused" },
]

export const customerJourney = [
    { clientName: "John Doe", email: "john@example.com ", type: "Campaign Added", details: 'Added to "Promo 2024"', status: "Success", timestamp: "Jun 18,2024 | 14:20:11" },
    { clientName: "John Doe", email: "john@example.com ", type: "Campaign Added", details: 'Added to "Promo 2024"', status: "Bounced", timestamp: "Jun 18,2024 | 14:20:11" },
    { clientName: "John Doe", email: "john@example.com ", type: "Campaign Added", details: 'Added to "Promo 2024"', status: "Approved", timestamp: "Jun 18,2024 | 14:20:11" },
    { clientName: "John Doe", email: "john@example.com ", type: "Campaign Added", details: 'Added to "Promo 2024"', status: "Pending Review", timestamp: "Jun 18,2024 | 14:20:11" },
    { clientName: "John Doe", email: "john@example.com ", type: "Campaign Added", details: 'Added to "Promo 2024"', status: "Replied", timestamp: "Jun 18,2024 | 14:20:11" },
    { clientName: "John Doe", email: "john@example.com ", type: "Campaign Added", details: 'Added to "Promo 2024"', status: "Delivered", timestamp: "Jun 18,2024 | 14:20:11" },
];

export const campaignsManagement = [
    { name: "John Deo", client: "Client A", targetLocation: "Sydney, Melbourne", status: "Active", createdOn: "Jun 18,2024" },
    { name: "John Deo", client: "Client A", targetLocation: "Sydney, Melbourne", status: "Active", createdOn: "Jun 18,2024" },
    { name: "John Deo", client: "Client A", targetLocation: "Sydney, Melbourne", status: "Completed", createdOn: "Jun 18,2024" },
    { name: "John Deo", client: "Client A", targetLocation: "Sydney, Melbourne", status: "Active", createdOn: "Jun 18,2024" },
    { name: "John Deo", client: "Client A", targetLocation: "Sydney, Melbourne", status: "Active", createdOn: "Jun 18,2024" },
    { name: "John Deo", client: "Client A", targetLocation: "Sydney, Melbourne", status: "Completed", createdOn: "Jun 18,2024" },
]

export const manageCustomers = [
    { customerName: "John Doe", email: "john@example.com", phone: "+91 9876543210", client: "ABC Garage", tags: "VIP", status: "Active" },
    { customerName: "John Doe", email: "john@example.com", phone: "+91 9876543210", client: "ABC Garage", tags: "VIP", status: "Inactive" },
    { customerName: "John Doe", email: "john@example.com", phone: "+91 9876543210", client: "ABC Garage", tags: "VIP", status: "Active" },
    { customerName: "John Doe", email: "john@example.com", phone: "+91 9876543210", client: "ABC Garage", tags: "VIP", status: "Inactive" },
    { customerName: "John Doe", email: "john@example.com", phone: "+91 9876543210", client: "ABC Garage", tags: "VIP", status: "Active" },
    { customerName: "John Doe", email: "john@example.com", phone: "+91 9876543210", client: "ABC Garage", tags: "VIP", status: "Inactive" },
]

export const reviewsOversight = [
    { clientName: "ABC Dental", location: "Melbourne", customer: "John Doe", sentiment: 'Positive', reviewSource: "Google", timestamp: "Jun 18,2024 | 14:20:11" },
    { clientName: "ABC Dental", location: "Melbourne", customer: "John Doe", sentiment: 'Positive', reviewSource: "Yelp", timestamp: "Jun 18,2024 | 14:20:11" },
    { clientName: "ABC Dental", location: "Melbourne", customer: "John Doe", sentiment: 'Neutral', reviewSource: "Facebook", timestamp: "Jun 18,2024 | 14:20:11" },
    { clientName: "ABC Dental", location: "Melbourne", customer: "John Doe", sentiment: 'Positive', reviewSource: "Yelp", timestamp: "Jun 18,2024 | 14:20:11" },
    { clientName: "ABC Dental", location: "Melbourne", customer: "John Doe", sentiment: 'Positive', reviewSource: "Yelp", timestamp: "Jun 18,2024 | 14:20:11" },
];
export const JourneyCustomer = [
    { title: "Client", name: "ABC Ltd" },
    { title: "Business Type", name: "E-Commerce" },
    { title: "Journey Type", name: "Journey Type" },
    { title: "Journey Start", name: "Jun 18,2024" },
    { title: "Last Update", name: "Jun 20,2024" },
]

export const CustomerDetails = [
    { title: "Name", name: "John Smith" },
    { title: "Email", name: "johnsmith@gmail.com" },
    { title: "Phone", name: "+61-123456789" },
]

export const CustomerTimeline = [
    { title: "Jun 14,2024", name: "Clicked Review Link" },
    { title: "Jun 13,2024", name: "Opened Email" },
    { title: "Jun 12,2024", name: "Review Request Sent" },
    { title: "Jun 12,2024", name: "Customer Added to Campaign" },
]

export const ReviewOversight = [
    { title: "Customer", subtitle: "John Doe" },
    { title: "Email", subtitle: "john@example.com" },
    { title: "Phone", subtitle: "+61412345678" },
    { title: "Business", subtitle: "ABC Dental - Melbourne" },
    { title: "Review Source", subtitle: "Google" },
    { title: "Rating", subtitle: "Star" },
    { title: "Sentiment", subtitle: "Positive" },
    { title: "Status", subtitle: "Approved" },
    { title: "Timestamp", subtitle: "Jun 18,2024 | 10:00AM" },
    { title: "Review Text", subtitle: "Great service, highly recommend!" },
]
export const widgetManagement = [
    { widgetName: "Carasoul", type: "Dynamic", status: "Published", assignedClients: "150" },
    { widgetName: "Carasoul", type: "Dynamic", status: "Draft", assignedClients: "150" },
    { widgetName: "Carasoul", type: "Dynamic", status: "Published", assignedClients: "150" },
    { widgetName: "Carasoul", type: "Dynamic", status: "Draft", assignedClients: "150" },
    { widgetName: "Carasoul", type: "Dynamic", status: "Published", assignedClients: "150" },
    { widgetName: "Carasoul", type: "Dynamic", status: "Draft", assignedClients: "150" }
]

export const reviewSourcesList = [
    { url: "https//www.google.com", clientName: "John Deo", status: "Connected", img: "/images/yelp-logo.svg" },
    { url: "https//www.google.com", clientName: "John Deo", status: "Disconnect", img: "/images/yelp-logo.svg" },
    { url: "https//www.google.com", clientName: "John Deo", status: "Connected", img: "/images/yelp-logo.svg" },
    { url: "https//www.google.com", clientName: "John Deo", status: "Disconnect", img: "/images/yelp-logo.svg" },
    { url: "https//www.google.com", clientName: "John Deo", status: "Connected", img: "/images/yelp-logo.svg" },
]

export const planManagement = [
    { planName: "Basic", price: "$20/Mo", discount: "10%", email: "1000", sms: "100" },
    { planName: "Standard", price: "$50/Mo", discount: "15%", email: "5,000", sms: "500" },
    { planName: "Premium", price: "$100/Mo", discount: "20%", email: "10,000", sms: "1,000" },
]

export const featureManagement = [
    { featureName: "Review Auto-Response", description: "AI-driven responses" },
    { featureName: "Review Auto-Response", description: "AI-driven responses" },
    { featureName: "Review Auto-Response", description: "AI-driven responses" },
    { featureName: "Review Auto-Response", description: "AI-driven responses" },
    { featureName: "Review Auto-Response", description: "AI-driven responses" },
    { featureName: "Review Auto-Response", description: "AI-driven responses" },
    { featureName: "Review Auto-Response", description: "AI-driven responses" },
    { featureName: "Review Auto-Response", description: "AI-driven responses" },
]

export const subscriptionManagement = [
    { id: "SUB123", clientName: "ABC Corp", plan: "Basic", status: "Active" },
    { id: "SUB123", clientName: "ABC Corp", plan: "Basic", status: "Active" },
    { id: "SUB123", clientName: "ABC Corp", plan: "Basic", status: "Canceled" },
    { id: "SUB123", clientName: "ABC Corp", plan: "Basic", status: "Active" },
]

export const invoiceManagement = [
    { id: "INV123", clientName: "ABC Corp", amount: "$50", status: "Paid" },
    { id: "INV123", clientName: "ABC Corp", amount: "$50", status: "Paid" },
    { id: "INV123", clientName: "ABC Corp", amount: "$50", status: "Overdue" },
    { id: "INV123", clientName: "ABC Corp", amount: "$50", status: "Paid" },
    { id: "INV123", clientName: "ABC Corp", amount: "$50", status: "Paid" },
    { id: "INV123", clientName: "ABC Corp", amount: "$50", status: "Overdue" },
    { id: "INV123", clientName: "ABC Corp", amount: "$50", status: "Paid" },
]

export const paymentManagement = [
    { id: "PAY-001", clientName: "ABC Corp", amount: "$79", status: "Completed", date: "Mar 25,2025" },
    { id: "PAY-001", clientName: "ABC Corp", amount: "$79", status: "Pending", date: "Mar 25,2025" },
    { id: "PAY-001", clientName: "ABC Corp", amount: "$79", status: "Completed", date: "Mar 25,2025" },
    { id: "PAY-001", clientName: "ABC Corp", amount: "$79", status: "Pending", date: "Mar 25,2025" },
    { id: "PAY-001", clientName: "ABC Corp", amount: "$79", status: "Completed", date: "Mar 25,2025" },
    { id: "PAY-001", clientName: "ABC Corp", amount: "$79", status: "Pending", date: "Mar 25,2025" },
    { id: "PAY-001", clientName: "ABC Corp", amount: "$79", status: "Completed", date: "Mar 25,2025" },
]

export const SubscriptionUsage = [
    { name: "Client", title: "ABC Corp" },
    { name: "plan", title: "Basic" },
    { name: "Email Quota Used", title: "500/1,000" },
    { name: "SMS Quota Used", title: " 50/100" },
]