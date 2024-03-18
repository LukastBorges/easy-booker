# Clean Architecture for React with TypeScript

Clean Architecture is a software design philosophy introduced by Robert C. Martin, also known as Uncle Bob. It emphasizes the separation of concerns and the independence of layers in a software system, promoting maintainability, testability, and scalability. When applied to a React application with TypeScript, Clean Architecture principles can help developers build robust, modular, and maintainable codebases. This document outlines an adapted and simplified version of Clean Architecture tailored for react applications.

## Overview of Clean Architecture

Clean Architecture divides a software system into distinct layers, each with its own responsibilities and dependencies. These layers typically include:

1. **Domain**: Represent domain-specific objects or business logic.
2. **Use Cases**: Contains application-specific business rules or use cases.
3. **Interface Adapters**: Converts data between the use cases and the external world. 
4. **Frameworks and Drivers**: Includes external frameworks, libraries, and UI components.

These layers form concentric circles, with the inner layers containing the most fundamental and stable components, while the outer layers deal with implementation details and external dependencies.

## Adaptation for Front-end React based application

This project implements layered architecture that borrows some concepts from [clean architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) and also [domain-driven design (DDD)](https://martinfowler.com/bliki/DomainDrivenDesign.html). These concepts are usually used in backend development, but for this project it was adapted and simplified properly fit the front-end development environment.

### 1. **Domain**

These are objects or business logic related to entities.

#### 1.1 Entity

These can be simple TypeScript interfaces or types defining the structure and behavior of domain entities.

**Example:**

```typescript
// User entity representing a user in the system
interface User {
  id: string;
  username: string;
  email: string;
  // Additional properties and methods...
}
```

#### 1.2 Infra

These represent business logic related to usage of the entity objects. They include mappers of raw data from API to internal models or mappers to payload usage on APIs.

These functions act as a boundary between the external world and our application. That way we create an anti-corruption layer that will defend our domain from interference from external sources:

> It is not an Access Control List. An Anti-Corruption Layer (ACL) is a set of patterns placed between the domain model and other bounded contexts or third party dependencies. The intent of this layer is to prevent the intrusion of foreign concepts and models into the domain model. This ACL layer is typically made up of several well-known design patterns such as Facade, Adapter and Translator. The patterns are used to map between foreign domain models and APIs to types and interfaces that are part of the domain model. - Ruthie Ballenger

```typescript
// A mapper like function 
function mapApiToUser(rawUser) {
  return {
    id: rawUser.id;
    userName: rawUser.user_name;
    email: rawUser.email;
    // Additional properties
  }
}
```

### 2. **Use Cases**
Use Cases encapsulate application-specific business logic or use cases. This extra layer of abstraction adds unnecessary complexity to react base application in my opinion. It adds bureaucracy and code that outweighs the benefits, making up for a bad DX on front-end development. We can directly connect components/pages to the data through **custom hooks**, which looks familiar to the Components/Containers wide used "architecture" while partially embracing the use-case role.

**Example:**

```typescript
import { useQuery } from '@tanstack/react-query'

import { getUser } from 'services/user'

function useGetUser() {
  const {
    isLoading,
    error,
    data = [],
    refetch
  } = useQuery({
    queryKey: ['getUser'],
    queryFn: getUser
  })

  return { isLoading, error, refetch, data: user }
}
```

### 3. **Interface Adapters**
Interface Adapters convert data between the use cases (custom hooks) and the external world, including UI components. For this react application this layer consists of components, pages and presenters responsible for interacting with the UI and external APIs.

### 3.2 **Presenters**

Presenters are, basically, an adapter layer between our UI and the business layer (or the entities). Its main responsibility is to normalize and format data to display on the UI layer. You can imagine the presenter acting almost like a decorator for domain data.

> "The job of the Presenter is to repackage the OutputData into viewable form as the ViewModel, which is yet another plain old Java object. The ViewModel contains mostly Strings and flags that the View uses to display the data. Whereas the OutputData may contain Date objects, the Presenter will load the ViewModel with corresponding Strings already formatted properly for the user." – Uncle Bob

**Example:**

```ts
const getUserFullName = (user: User) => {
  return `${user.firstName} ${user.lastName}`
}
```
### 3.1 **UI Components**

UI components adhere to the principles of separation of concerns and independence of frameworks, ensuring that user interface elements are decoupled from the underlying business logic and data access layers. In the clean architecture, UI components, such as screens or views, focus solely on presenting information and handling user interactions.

```tsx
const UserProfile = ({ userId }: { userId: string }) => {
  const [user, setUser] = useState<User | null>(null);
  const { isLoading, error, user } = useGetUser(userId)

  if (isLoading) return <p>Loading...</p>


  if (error) return <p>Error message</p>

  return (
    <div>
      <h2>{getUserFullName(user)}</h2>
      <p>{user.email}</p>
    </div>
  );
};
```
These adapters simplify the footprint of react components, while making easier to cover the test scenarios by splitting then in unit tests.

### 4. **Frameworks and Drivers**
Frameworks and Drivers include external dependencies such as React, Redux, API clients, and UI libraries. These are the outermost layer of the architecture and interact directly with the infrastructure or external systems.

**Example:**

```tsx
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
        <ConfigProvider>
          <RouterProvider router={router} />
        </ConfigProvider>
    </QueryClientProvider>
  );
};
```

## Benefits of Clean Architecture for React with TypeScript
- **Modularity**: Clean Architecture promotes modularity by separating concerns into distinct layers, making it easier to understand, maintain, and extend the codebase.
- **Testability**: Each layer is independent and can be tested in isolation, enabling thorough testing of business logic and UI components.
- **Scalability**: Clean Architecture facilitates the scalability of React applications by providing a clear structure that accommodates growth and changes in requirements.
- **Maintainability**: By enforcing separation of concerns, Clean Architecture reduces code coupling and enhances code maintainability, making it easier to refactor and extend the application over time.

## Resources
- [Ruthie Ballenger on ACL](https://blogit.michelin.io/anti-corruption-layer)
- [Uncle Bob on clean architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Talysson Oliveira on scalable frontend architectures](https://blog.codeminer42.com/scalable-frontend-1-architecture-9b80a16b8ec7/)
-[Martin Fowler on Domain Driven Design](https://martinfowler.com/bliki/DomainDrivenDesign.html)
