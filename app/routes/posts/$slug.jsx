import { Link } from "remix";
import { useLoaderData } from "remix";
import invariant from "tiny-invariant";
import styles from "~/styles/index.css";
import { datoQuerySubscription } from "~/lib/datocms";
import { responsiveImageFragment, metaTagsFragment } from "~/lib/fragments";
import { Avatar, links as avatarLinks } from "~/components/Avatar";
import { Date, links as dateLinks } from "~/components/Date";
import { Image, toRemixMeta, useQuerySubscription } from "react-datocms";
import { CodeSpan, CodeBlock } from "./style";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import { useEffect } from "react";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";

export function links() {
  return [
    ...avatarLinks(),
    ...dateLinks(),
    { rel: "stylesheet", href: styles },
  ];
}

export const loader = async ({ request, params }) => {
  invariant(params.slug, "expected params.slug");

  return datoQuerySubscription({
    request,
    query: `
      query PostBySlug($slug: String) {
        post(filter: {slug: {eq: $slug}}) {
          seo: _seoMetaTags {
            ...metaTagsFragment
          }
          title
          slug
          content {
            value
            blocks {
              __typename
              ...on ImageBlockRecord {
                id
                image {
                  responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
                    ...responsiveImageFragment
                  }
                }
              }
            }
          }
          date
          ogImage: coverImage{
            url(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 })
          }
          coverImage {
            responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
              ...responsiveImageFragment
            }
          }
          author {
            name
            picture {
              url(imgixParams: {fm: jpg, fit: crop, w: 100, h: 100, sat: -100})
            }
          }
        }
        morePosts: allPosts(orderBy: date_DESC, first: 2, filter: {slug: {neq: $slug}}) {
          title
          slug
          excerpt
          date
          coverImage {
            responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
              ...responsiveImageFragment
            }
          }
          author {
            name
            picture {
              url(imgixParams: {fm: jpg, fit: crop, w: 100, h: 100, sat: -100})
            }
          }
          }
      }
      ${responsiveImageFragment}
      ${metaTagsFragment}
    `,
    variables: {
      slug: params.slug,
    },
  });
};

export const meta = ({ data }) =>
  toRemixMeta(data.datoQuerySubscription.initialData.post.seo);

export default function PostSlug() {
  const { datoQuerySubscription } = useLoaderData();
  const {
    data: { post, morePosts },
  } = useQuerySubscription(datoQuerySubscription);

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const renderContent = (content) => {
    const renderedContent = [];

    content.document.children.forEach((item, index) => {
      if (item.type === "paragraph") {
        const paragraph = item.children.map((child, childIndex) => {
          if (child.marks && child.marks.includes("code")) {
            return <CodeSpan key={childIndex}>{child.value}</CodeSpan>;
          } else {
            return <span key={childIndex}>{child.value}</span>;
          }
        });

        renderedContent.push(<p key={index}>{paragraph}</p>);
      } else if (item.type === "code") {
        const language = item.language || "javascript";
        return renderedContent.push(
          <CodeBlock className="line-numbers" key={index}>
            <code className={`language-${language}`}>{item.code}</code>
          </CodeBlock>
        );
      }
    });

    return renderedContent;
  };

  return (
    <div className="container">
      <section className="section">
        <Link to="/" className="grid__link">
          <p className="section__title">CodewCaro.</p>
        </Link>
      </section>
      <section className="section">
        <h1 className="title">{post.title}</h1>
      </section>
      <section className="section">
        <Avatar name={post.author.name} picture={post.author.picture} />
      </section>
      <Image className="grid__image" data={post.coverImage.responsiveImage} />
      <section className="section--narrow">
        <Date dateString={post.date} />
      </section>
      <section className="section--narrow">
        <div className="prose prose-lg prose-blue">
          {renderContent(post.content.value)}
        </div>
      </section>
      <section className="section">
        <ul className="grid">
          {morePosts.map((post) => (
            <li key={post.slug} className="grid__item">
              <Link to={`/posts/${post.slug}`} className="grid__link">
                <div>
                  <Image
                    className="grid__image"
                    data={post.coverImage.responsiveImage}
                  />
                  <p className="grid__title">{post.title}</p>
                  <Date dateString={post.date} />
                  <p className="date">{post.excerpt}</p>
                  <Avatar
                    name={post.author.name}
                    picture={post.author.picture}
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section className="section">
        <div className="section__title">More posts</div>
        <ul className="grid">
          {morePosts.map((post) => (
            <li key={post.slug} className="grid__item">
              <Link to={`/posts/${post.slug}`} className="grid__link">
                <div>
                  <Image
                    className="grid__image"
                    data={post.coverImage.responsiveImage}
                  />
                  <p className="grid__title">{post.title}</p>
                  <Date dateString={post.date} />
                  <p className="date">{post.excerpt}</p>
                  <Avatar
                    name={post.author.name}
                    picture={post.author.picture}
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
