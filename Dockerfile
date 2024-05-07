FROM postgres:latest

# Set environment variables
ENV POSTGRES_DB=postgres
ENV POSTGRES_USER=root
ENV POSTGRES_PASSWORD=root

# Expose the PostgreSQL port
EXPOSE 5432

# Set the default command for the container
CMD ["postgres"]
