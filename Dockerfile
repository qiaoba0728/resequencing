FROM dockerhub.qingcloud.com/zqzoffice/gitbook:v0.1

COPY . /template/
WORKDIR /template
RUN rm -rf .gitignore
# CMD ["/bin/sh", "/template/code.sh"]
CMD ["/bin/sh", "/template/docs.sh"]
